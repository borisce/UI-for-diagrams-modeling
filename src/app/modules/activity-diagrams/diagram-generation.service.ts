import { Injectable } from "@angular/core";
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import { SysVerilogHDLLexer } from "../editor/system_verilog/syntax-check/ANTLR/SysVerilogHDLLexer";
import { SysVerilogHDLParser } from "../editor/system_verilog/syntax-check/ANTLR/SysVerilogHDLParser";
import { SystemVerilogVisitor } from "./system-verilog-visitor";
import { MatTableDataSource } from "@angular/material/table";
import { InputOutput, InternalSignal, Parameter } from "./types/data-source.type";
import { Block } from "./types/diagram-data.type";
import * as joint from 'jointjs';
import { JointJsService } from "./joint-js.service";
import { GeneratedBlock, GeneratedStatement } from "./types/generate-diagram.type";
import { groupBy } from "lodash";
import { vhdlLexer } from "../editor/vhdl/syntax-check/ANTLR/vhdlLexer";
import { vhdlParser } from "../editor/vhdl/syntax-check/ANTLR/vhdlParser";
import { VHDLVisitor } from "./vhdl-visitor";

@Injectable()
export class DiagramGenerationService {
    public visitor: SystemVerilogVisitor | VHDLVisitor;

    // For unit testing purposes so we can disable paper formatting 
    public formatPaper = true;

    private jointJsService = new JointJsService();

    // Table data sources for UI tables
    private inputs = new MatTableDataSource<InputOutput>;
    private outputs = new MatTableDataSource<InputOutput>;
    private internalSignals = new MatTableDataSource<InternalSignal>;
    private parameters = new MatTableDataSource<Parameter>;
    // Represents blocks that will be returned and loaded to the UI - i.e the paper
    private blocks: Array<Block> = [];
    // Helpers
    private currentBlock: GeneratedBlock;
    private linkLabels: Array<{ id: joint.dia.Cell.ID, label: string }> = [];

    private doesFileContainErrors = false;

    public generateDiagram(fileName: string, fileContent: string) {
        if (!fileName.endsWith('.sv') && !fileName.endsWith('.vhd')) return;

        // Safety clear to make sure there is nothing from potential previous generation
        this.resetLocalVariables();

        if (fileName.endsWith('.sv')) {
            this.parseSvFile(fileContent);
        } else if (fileName.endsWith('.vhd')) {
            this.parseVhdlFile(fileContent);
        }

        this.fillTableData();

        this.generateJointJsDiagram();

        // If the file didn't have any block add an empty one since activity diagrams instance must have at least one block
        if (this.blocks.length === 0) {
            this.blocks.push({
                name: 'newBlock',
                logic: 'combinational',
                graph: new joint.dia.Graph({}, { cellNamespace: joint.shapes }),
                linkLabels: [],
            })
        }

        const diagramData = {
            doesFileContainErrors: this.doesFileContainErrors,
            moduleName: this.visitor.moduleName ?? 'module_name',
            inputs: this.inputs,
            outputs: this.outputs,
            internalSignals: this.internalSignals,
            parameters: this.parameters,
            blocks: this.blocks,
        }

        return diagramData;
    }

    private parseSvFile(fileContent: string) {
        const inputStream = new ANTLRInputStream(fileContent);
        const lexer = new SysVerilogHDLLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SysVerilogHDLParser(tokenStream);

        const tree = parser.description_star();

        if (parser.numberOfSyntaxErrors > 0) {
            this.doesFileContainErrors = true;
        }

        this.visitor = new SystemVerilogVisitor();
        this.visitor.visit(tree);
    }

    private parseVhdlFile(fileContent: string) {
        const inputStream = new ANTLRInputStream(fileContent);
        const lexer = new vhdlLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new vhdlParser(tokenStream);

        const tree = parser.design_file();

        if (parser.numberOfSyntaxErrors > 0) {
            this.doesFileContainErrors = true;
        }

        this.visitor = new VHDLVisitor();
        this.visitor.visit(tree);
    }

    /**
     * Goes through visitor.inputs, visitor.outputs, visitor.parameters, visitor.internalSignals and creates table data (data sources) for material tables in UI
     */
    private fillTableData() {
        this.visitor.inputs.forEach((input => {
            this.inputs.data.push({
                name: input.name,
                type: input.type,
                bits: input.bits,
            });
        }));

        this.visitor.outputs.forEach((output => {
            this.outputs.data.push({
                name: output.name,
                type: output.type,
                bits: output.bits,
            });
        }));

        this.visitor.internalSignals.forEach((signal => {
            this.internalSignals.data.push({
                name: signal.name,
                type: signal.type,
                bits: signal.bits,
            });
        }));

        this.visitor.parameters.forEach((parameter => {
            this.parameters.data.push({
                name: parameter.name,
                type: parameter.type,
                value: isNaN(parseInt(parameter.value)) ? '1' : parameter.value,
            });
        }));
    }

    private generateJointJsDiagram() {
        let currentTopLevelElement: joint.dia.Element;
        let previousTopLevelElement: joint.dia.Element;

        // We go through every parsed block from visitor.blocks
        this.visitor.blocks.forEach(block => {
            if (block.statements.length === 0) return;

            this.currentBlock = block;
            this.linkLabels = [];
            const graph = new joint.dia.Graph({}, { cellNamespace: joint.shapes });
            const startElement = this.jointJsService.createStart();
            const endElement = this.jointJsService.createEnd();
            startElement.addTo(graph);
            endElement.addTo(graph);

            // First we get all top level stataments in the block i.e. the ones that have no parent - parentId is null
            const topLevelStatements = block.statements.filter(statement => (statement.parentId === null || statement.parentId === undefined));

            topLevelStatements.forEach((statement, index) => {
                if (statement.elementType === 'action') {
                    currentTopLevelElement = this.jointJsService.createAction();
                    currentTopLevelElement.attr('label/text', statement.text);
                    currentTopLevelElement.addTo(graph);

                    // Calculate width based on statement.text
                    const width = statement.text.length * 7;
                    currentTopLevelElement.resize(width, currentTopLevelElement.size().height);

                    // Create link with start if it's first element
                    if (index === 0) {
                        this.createLink(graph, startElement, currentTopLevelElement);
                    } else if (previousTopLevelElement) {
                        this.createLink(graph, previousTopLevelElement, currentTopLevelElement, false);
                    }
                } else if (statement.elementType === 'if') {
                    const groupedChildren = this.getChildElements(statement.id, true);

                    // If element have either `true` or `false` branch
                    const trueBranch = groupedChildren['true'];
                    const falseBranch = groupedChildren['false'];

                    // If link doesn't have true/false branches we skip it since it's meaningless
                    if (!trueBranch && !falseBranch) {
                        return;
                    }

                    currentTopLevelElement = this.jointJsService.createDiamond('if', 'black');
                    currentTopLevelElement.attr('label/text', statement.text);
                    currentTopLevelElement.addTo(graph);

                    let link: joint.dia.Link;

                    // Create link with start if it's first element
                    if (index === 0) {
                        this.createLink(graph, startElement, currentTopLevelElement);
                    }
                    // Connect if to this.currentElement i.e. the element before this if
                    else if (previousTopLevelElement) {
                        this.createLink(graph, previousTopLevelElement, currentTopLevelElement, false);
                    }

                    // Every if must eventually merge into merge element
                    const mergeElement = this.jointJsService.createDiamond('merge', 'red');
                    mergeElement.addTo(graph);

                    if (trueBranch) {
                        const lastElementOfBranch = this.generateElementsForBranch(graph, currentTopLevelElement, trueBranch, 'true');
                        // This is for when false branch of loop would be connected to merge -> we need to put label on the link
                        if (lastElementOfBranch?.prop('name') === 'loop')
                            this.createLink(graph, lastElementOfBranch, mergeElement, true, 'false');
                        else
                            this.createLink(graph, lastElementOfBranch, mergeElement, false);
                    } else {
                        // this.currentElement i.e the if diamond will be directly connected with true link to the merge
                        this.createLink(graph, currentTopLevelElement, mergeElement, true, 'true');
                    }

                    if (falseBranch) {
                        const lastElementOfBranch = this.generateElementsForBranch(graph, currentTopLevelElement, falseBranch, 'false');
                        // This is for when false branch of loop would be connected to merge -> we need to put label on the link
                        if (lastElementOfBranch?.prop('name') === 'loop')
                            this.createLink(graph, lastElementOfBranch, mergeElement, true, 'false');
                        else
                            this.createLink(graph, lastElementOfBranch, mergeElement, false);
                    } else {
                        // this.currentElement i.e the if diamond will be directly connected with false link to the merge
                        this.createLink(graph, currentTopLevelElement, mergeElement, true, 'false');
                    }

                    // Merge is after is so we set is as current
                    currentTopLevelElement = mergeElement;
                } else if (statement.elementType === 'case') {
                    const groupedChildren = this.getChildElements(statement.id, true);

                    // Case elements must have at least 2 branches
                    if (Object.keys(groupedChildren).length < 2) return;

                    currentTopLevelElement = this.jointJsService.createDiamond('case', 'blue');
                    currentTopLevelElement.attr('label/text', statement.text);
                    currentTopLevelElement.addTo(graph);

                    let link: joint.dia.Link;

                    if (index === 0) {
                        this.createLink(graph, startElement, currentTopLevelElement);
                    } else if (previousTopLevelElement) {
                        this.createLink(graph, previousTopLevelElement, currentTopLevelElement, false);
                    }

                    // Every case must eventually merge into merge element
                    const mergeElement = this.jointJsService.createDiamond('merge', 'red');
                    mergeElement.addTo(graph);

                    Object.keys(groupedChildren).forEach((branch, index) => {
                        const branchStatements = groupedChildren[branch];
                        const lastElementOfBranch = this.generateElementsForBranch(graph, currentTopLevelElement, branchStatements, branch);

                        // This is for when false branch of loop would be connected to merge -> we need to put label on the link
                        if (lastElementOfBranch?.prop('name') === 'loop')
                            this.createLink(graph, lastElementOfBranch, mergeElement, true, branch);
                        else
                            this.createLink(graph, lastElementOfBranch, mergeElement, false);
                    });

                    // Merge is after is so we set is as current
                    currentTopLevelElement = mergeElement;
                } else if (statement.elementType === 'loop') {
                    // We don't need to group loop children, but in diagram we put true/false labels on links from loop element
                    const children = this.getChildElements(statement.id) as Array<GeneratedStatement>;

                    if (children.length === 0) return;

                    currentTopLevelElement = this.jointJsService.createLoop();
                    currentTopLevelElement.attr('label/text', statement.text);
                    currentTopLevelElement.addTo(graph);

                    let link: joint.dia.Link;

                    if (index === 0) {
                        this.createLink(graph, startElement, currentTopLevelElement);
                    } else if (previousTopLevelElement) {
                        this.createLink(graph, previousTopLevelElement, currentTopLevelElement, false);
                    }

                    const lastBranchElement = this.generateElementsForBranch(graph, currentTopLevelElement, children, 'true');

                    // Loop branches back to loop element, if last element of loop is loop we need to put label on the link
                    if (lastBranchElement?.prop('name') === 'loop')
                        this.createLink(graph, lastBranchElement, currentTopLevelElement, true, 'false');
                    else
                        this.createLink(graph, lastBranchElement, currentTopLevelElement, false);
                }

                previousTopLevelElement = currentTopLevelElement;
            });

            // Connect last element to end element
            this.createLink(graph, previousTopLevelElement, endElement, false);

            if (this.formatPaper) this.jointJsService.formatPaper(graph);

            this.blocks.push({
                name: block.name,
                logic: block.logic,
                graph: graph,
                linkLabels: this.linkLabels,
            });

            this.currentBlock = null;
            this.linkLabels = [];
        });

        // There were some assign statements in the code -> we create a separate always_comb block to put them
        // Elements in this block will be strictly `action` since assign statements are assigning stuff
        if (this.visitor.assignBlock.statements.length > 0) {
            const graph = new joint.dia.Graph({}, { cellNamespace: joint.shapes });

            const startElement = this.jointJsService.createStart();
            const endElement = this.jointJsService.createEnd();

            startElement.addTo(graph);
            endElement.addTo(graph);

            let lastElement: joint.dia.Element;

            this.visitor.assignBlock.statements.forEach((statement, index) => {
                const actionElement = this.jointJsService.createAction();
                actionElement.attr('label/text', statement.text);
                actionElement.addTo(graph);

                if (index === 0) {
                    const link = this.jointJsService.createLink(startElement, actionElement);
                    link.addTo(graph);
                }

                if (index === this.visitor.assignBlock.statements.length - 1) {
                    const link = this.jointJsService.createLink(actionElement, endElement);
                    link.addTo(graph);
                }

                if (lastElement) {
                    const link = this.jointJsService.createLink(lastElement, actionElement);
                    link.addTo(graph);
                }

                lastElement = actionElement;
            });

            if (this.formatPaper) this.jointJsService.formatPaper(graph);

            this.blocks.push({
                name: this.visitor.assignBlock.name,
                logic: this.visitor.assignBlock.logic,
                graph: graph,
                linkLabels: [],
            });
        }
    }

    private generateElementsForBranch(graph: joint.dia.Graph, parentElement: joint.dia.Element, statements: Array<GeneratedStatement>, branch: string) {
        let currentElement: joint.dia.Element;
        let previousElement: joint.dia.Element;

        statements.forEach((statement, index) => {
            if (statement.elementType === 'action') {
                currentElement = this.jointJsService.createAction();
                currentElement.attr('label/text', statement.text);
                currentElement.addTo(graph);

                // Calculate width based on statement.text
                const width = statement.text.length * 7;
                currentElement.resize(width, currentElement.size().height);

                if (index === 0) {
                    this.createLink(graph, parentElement, currentElement, true, branch);
                } else if (previousElement) {
                    this.createLink(graph, previousElement, currentElement, false);
                }
            } else if (statement.elementType === 'if') {
                const groupedChildren = this.getChildElements(statement.id, true);
                // If element have either `true` or `false` branch
                const trueBranch = groupedChildren['true'];
                const falseBranch = groupedChildren['false'];

                // If link doesn't have true/false branches we skip it since it's meaningless
                if (!trueBranch && !falseBranch) {
                    return;
                }

                currentElement = this.jointJsService.createDiamond('if', 'black');
                currentElement.attr('label/text', statement.text);
                currentElement.addTo(graph);

                // Connect if to this.currentElement i.e. the element before this if
                let link: joint.dia.Link;
                if (index === 0) {
                    this.createLink(graph, parentElement, currentElement, true, branch);
                }
                else if (previousElement) {
                    this.createLink(graph, previousElement, currentElement, false);
                }

                // Every if must eventually merge into merge element
                const mergeElement = this.jointJsService.createDiamond('merge', 'red');
                mergeElement.addTo(graph);

                if (trueBranch) {
                    const lastElementOfBranch = this.generateElementsForBranch(graph, currentElement, trueBranch, 'true');

                    if (lastElementOfBranch?.prop('name') === 'loop')
                        this.createLink(graph, lastElementOfBranch, mergeElement, true, 'false');
                    else
                        this.createLink(graph, lastElementOfBranch, mergeElement, false);
                } else {
                    // this.currentElement i.e the if diamond will be directly connected with true link to the merge
                    this.createLink(graph, currentElement, mergeElement, true, 'true');
                }

                if (falseBranch) {
                    const lastElementOfBranch = this.generateElementsForBranch(graph, currentElement, falseBranch, 'false');

                    if (lastElementOfBranch?.prop('name') === 'loop')
                        this.createLink(graph, lastElementOfBranch, mergeElement, true, 'false');
                    else
                        this.createLink(graph, lastElementOfBranch, mergeElement, false);
                } else {
                    // this.currentElement i.e the if diamond will be directly connected with false link to the merge
                    this.createLink(graph, currentElement, mergeElement, true, 'false');
                }

                // Merge is after is so we set is as current
                currentElement = mergeElement;
            } else if (statement.elementType === 'case') {
                const groupedChildren = this.getChildElements(statement.id, true);

                // Case elements must have at least 2 branches
                if (Object.keys(groupedChildren).length < 2) return;

                currentElement = this.jointJsService.createDiamond('case', 'blue');
                currentElement.attr('label/text', statement.text);
                currentElement.addTo(graph);

                let link: joint.dia.Link;

                if (index === 0) {
                    this.createLink(graph, parentElement, currentElement, true, branch);
                } else if (previousElement) {
                    this.createLink(graph, previousElement, currentElement, false);
                }

                // Every case must eventually merge into merge element
                const mergeElement = this.jointJsService.createDiamond('merge', 'red');
                mergeElement.addTo(graph);

                Object.keys(groupedChildren).forEach((branch, index) => {
                    const branchStatements = groupedChildren[branch];
                    const lastElementOfBranch = this.generateElementsForBranch(graph, currentElement, branchStatements, branch);

                    if (lastElementOfBranch?.prop('name') === 'loop')
                        this.createLink(graph, lastElementOfBranch, mergeElement, true, branch);
                    else
                        this.createLink(graph, lastElementOfBranch, mergeElement, false);
                });

                // Merge is after is so we set is as current
                currentElement = mergeElement;
            } else if (statement.elementType === 'loop') {
                // We don't need to group loop children, but in diagram we put true/false labels on links from loop element
                const children = this.getChildElements(statement.id) as Array<GeneratedStatement>;

                if (children.length === 0) return;

                currentElement = this.jointJsService.createLoop();
                currentElement.attr('label/text', statement.text);
                currentElement.addTo(graph);

                let link: joint.dia.Link;

                if (index === 0) {
                    this.createLink(graph, parentElement, currentElement, true, branch);
                } else if (previousElement) {
                    this.createLink(graph, previousElement, currentElement, false);
                }

                const lastBranchElement = this.generateElementsForBranch(graph, currentElement, children, 'true');

                // Loop branches back to loop element, if last element of loop is loop we need to put label on the link
                if (lastBranchElement?.prop('name') === 'loop')
                    this.createLink(graph, lastBranchElement, currentElement, true, 'false');
                else
                    this.createLink(graph, lastBranchElement, currentElement, false);
            }

            previousElement = currentElement;
        });

        return currentElement;
    }

    private createLink(graph: joint.dia.Graph, source: joint.dia.Element, target: joint.dia.Element, addLinkLabel = false, label?: string) {
        const link = this.jointJsService.createLink(source, target);

        // When generating loops we only generate the true branch i.e. the contents of the loop
        // The false branch is the element after the loop which we don't have acces to at that moment
        // That's why here is previous element is loop and label hasn't been passed, we add a link label to it since it's the false branch
        if (source.prop('name') === 'loop' && !label) {
            this.jointJsService.addLinkLabel(link, 'false');
            this.linkLabels.push({ id: link.id, label: 'false' });
        }

        if (addLinkLabel) {
            this.jointJsService.addLinkLabel(link, label);
            this.linkLabels.push({ id: link.id, label: label });
        }

        link.addTo(graph);
    }

    private getChildElements(parentId: number, groupByBranch = false) {
        if (groupByBranch) {
            const children = this.currentBlock.statements.filter(statement => statement.parentId === parentId);
            return groupBy(children, 'branch');
        }

        return this.currentBlock.statements.filter(statement => statement.parentId === parentId);
    }

    private resetLocalVariables() {
        this.inputs.data = [];
        this.outputs.data = [];
        this.internalSignals.data = [];
        this.parameters.data = [];
        this.blocks = [];
        this.currentBlock = null;
        this.linkLabels = [];
        this.doesFileContainErrors = false;
    }
}