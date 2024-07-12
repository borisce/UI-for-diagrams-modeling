import { Injectable } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { InputOutput, InternalSignal, Parameter } from "./types/data-source.type";
import { Block } from "./types/diagram-data.type";
import { graphlib } from 'dagre';

@Injectable()
export class CodeGenerationService {
    public code = '';
    public lastVisitedMerge = '';
    public visitedLoops: Array<string> = [];

    /**
        * Performs checks for all tables
     */
    public checkTables(inputs: MatTableDataSource<InputOutput>, outputs: MatTableDataSource<InputOutput>, internalSignals: MatTableDataSource<InternalSignal>, parameters: MatTableDataSource<Parameter>): string {
        const checkInputs = this.checkDataSourceTableFields(inputs, 'input');
        if (checkInputs !== '') return checkInputs;

        const checkOutputs = this.checkDataSourceTableFields(outputs, 'output');
        if (checkOutputs !== '') return checkOutputs;

        const checkInternalSignals = this.checkDataSourceTableFields(internalSignals, 'internal signal');
        if (checkInternalSignals !== '') return checkInternalSignals;

        const checkParameters = this.checkDataSourceTableFields(parameters, 'parameter');
        if (checkParameters !== '') return checkParameters;

        const checkUniqueNames = this.checkDataSourceTablesUniqueNames(inputs, outputs, internalSignals, parameters);
        if (checkUniqueNames !== '') return checkUniqueNames;

        return '';
    }

    /** 
        * Function called before generating the code for all possible checks on elements 
        * This is called for every block
    */
    public checkGraph(serializedGraph: any, graph: joint.dia.Graph, linkLabels: Array<{ id: joint.dia.Cell.ID, label: string }>): string {
        // Check if start element exists
        let startElement = serializedGraph.cells.filter((element: { name: string; }) => element.name == 'start');
        if (startElement.length == 0) {
            return 'Error: No start element found.';
        } else if (startElement.length > 1) {
            return 'Error: More than one start element found.';
        }

        // Check is end element exists
        let endElement = serializedGraph.cells.filter((element: { name: string; }) => element.name == 'end');
        if (endElement.length == 0) {
            return 'Error: No end element found.';
        } else if (endElement.length > 1) {
            return 'Error: More than one end element found.';
        }

        // Check for all elements
        for (let i = 0; i < serializedGraph.cells.length; i++) {
            if (serializedGraph.cells[i].type == 'standard.Link') continue;

            let links = graph.getConnectedLinks(serializedGraph.cells[i]);

            // Check if element has at least 1 link
            if (links.length == 0) {
                return 'Error: All elements must have at least one link.';
            }

            // Check for start element
            // (1) - Start element can have only 1 link which is going outwards
            if (serializedGraph.cells[i]['name'] == 'start') {
                // (1)
                if (links.length > 1) {
                    return 'Error: Start element can have only 1 link.';
                }
                if (links[0].get('source').id != serializedGraph.cells[i].id) {
                    return 'Error: Start element can have only 1 link which is going outwards.';
                }
            }
            // Check for end element
            // (1) - End element can only have 1 link which is going inwards
            else if (serializedGraph.cells[i]['name'] == 'end') {
                // (1)
                if (links.length > 1) {
                    return 'Error: End element can have only 1 link.';
                }
                if (links[0].get('target').id != serializedGraph.cells[i].id) {
                    return 'Error: End element can have only 1 link which is going inwards.';
                }
            }
            // Check for action elements
            // (1) - If action has more than 2 links -> error
            // (2) - If action has 2 links -> check if one is in and one is out
            // (3) - Check if action element has caption
            else if (serializedGraph.cells[i]['name'] == 'action') {
                // (1)
                if (links.length != 2) {
                    return 'Error: Actions must have exactly 2 links.';
                }
                // (2)
                else if (links.length == 2) {
                    let inLink = false;
                    let outLink = false;
                    for (let j = 0; j < links.length; j++) {
                        if (links[j].attributes['source'].id == serializedGraph.cells[i].id) {
                            outLink = true;
                        } else if (links[j].attributes['target'].id == serializedGraph.cells[i].id) {
                            inLink = true;
                        }
                    }
                    if (inLink == false || outLink == false) {
                        return 'Error: Action can have only 1 connection going in and only 1 connection going out.';
                    }
                }

                // (3)
                if (serializedGraph.cells[i].attrs.label['text'] == '' || serializedGraph.cells[i].attrs.label['text'] == undefined) {
                    return 'Error: Action elements must have a caption.';
                }
            }
            // Check for if elements
            // (1) - If needs to have 3 links -> 1 going in and 2 going out
            // (2) - Check if all outgoing links from if have caption
            // (3) - Check if IF element has caption
            // (4) - Check if outgoing links have different labels
            else if (serializedGraph.cells[i]['name'] == 'if') {
                let outgoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { outbound: true });
                let ingoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { inbound: true });

                // (1)
                if (links.length != 3) {
                    return 'Error: If element must have 3 connections (1 going in and 2 going out).';
                } else {
                    if (outgoingLinks.length != 2 && ingoingLinks.length != 1) {
                        return 'Error: If element must have 2 outgoing connections and 1 connection going inwards.';
                    }
                }

                // (2)
                for (let j = 0; j < outgoingLinks.length; j++) {
                    let linkCaption = linkLabels.find((label: { id: string | number; }) => label.id == outgoingLinks[j].id);

                    if (linkCaption == undefined || linkCaption.label == '') {
                        return 'Error: All outgoing links from if element must have a caption.';
                    }
                }

                // (3)
                if (serializedGraph.cells[i].attrs.label['text'] == '' || serializedGraph.cells[i].attrs.label['text'] == undefined) {
                    return 'Error: If elements must have a caption.';
                }

                // (4)
                let labels = [];
                for (let j = 0; j < outgoingLinks.length; j++) {
                    labels.push(linkLabels.find((label: { id: string | number; }) => label.id == outgoingLinks[j].id).label);
                }
                let tmp = new Set(labels);
                if (tmp.size != labels.length) {
                    return 'Error: Outgoing links from if element must have unique labels.';
                }
            }
            // Check for case elements
            // (1) - Case needs to have al least 3 links
            // (2) - Check if all outgoing links from case have caption
            // (3) - Check if case element has caption
            // (4) - Check if there is 1 incoming link
            // (5) - Check if outgoing links have different labels
            else if (serializedGraph.cells[i]['name'] == 'case') {
                let outgoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { outbound: true });
                let ingoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { inbound: true });

                // (1)
                if (links.length < 3) {
                    return 'Error: Case element must have at least 3 connections (1 going in and 2 going out).';
                }

                // (2)
                for (let j = 0; j < outgoingLinks.length; j++) {
                    let linkCaption = linkLabels.find((label: { id: string | number; }) => label.id == outgoingLinks[j].id);

                    if (linkCaption == undefined || linkCaption.label == '') {
                        return 'Error: All outgoing links from case element must have a caption.';
                    }
                }

                // (3)
                if (serializedGraph.cells[i].attrs.label['text'] == '' || serializedGraph.cells[i].attrs.label['text'] == undefined) {
                    return 'Error: Case elements must have a caption.';
                }

                // (4)
                if (ingoingLinks.length != 1) {
                    return 'Error: There can be only 1 ingoing link to case element.';
                }

                // (5)
                let labels = [];
                for (let j = 0; j < outgoingLinks.length; j++) {
                    labels.push(linkLabels.find((label: { id: string | number; }) => label.id == outgoingLinks[j].id).label);
                }
                let tmp = new Set(labels);
                if (tmp.size != labels.length) {
                    return 'Error: Outgoing links from if element must have unique labels.';
                }
            }
            // Check for loop elements
            // (1) - Loop must have exactly 4 links
            // (2) - Check if there are 2 incoming links
            // (3) - Check if there are 2 outgoing links
            // (4) - Check if two outgoing links have true and false captions (unique)
            // (5) - Loop element must have a caption
            // (6) - Safety double check measure
            //       - check if graph is acyclic - it can't be since there is a loop element
            //       - the previous checks should make it that there is a loop together with the requirements for other elements, this is just safety
            else if (serializedGraph.cells[i]['name'] == 'loop') {
                // (1)
                if (links.length !== 4) {
                    return 'Error: Loop must have exactly 4 links.';
                } else if (links.length === 4) {
                    const outgoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { outbound: true });
                    const ingoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { inbound: true });

                    // (2)
                    if (ingoingLinks.length !== 2) {
                        return 'Error: Loop must have exactly 2 connections going in.';
                    }
                    // (3)
                    if (outgoingLinks.length !== 2) {
                        return 'Error: Loop must have exactly 2 connections going out.';
                    }

                    // (4)
                    const outgoingLinkLabels: Array<string> = [];
                    for (let j = 0; j < outgoingLinks.length; j++) {
                        const linkCaption = linkLabels.find((label: { id: string | number; }) => label.id == outgoingLinks[j].id);
                        if (linkCaption === undefined) {
                            return 'Error: All outgoing links from loop element must have a caption.';
                        }
                        outgoingLinkLabels.push(linkCaption.label);
                    }

                    const uniqueOutgoingLinkLabels = new Set(outgoingLinkLabels);
                    if (uniqueOutgoingLinkLabels.size !== 2) {
                        return 'Error: Loop must have exactly 2 outgoing with unique labels (true and false)';
                    }

                    // (5)
                    if (serializedGraph.cells[i].attrs.label['text'] === '' || serializedGraph.cells[i].attrs.label['text'] === undefined) {
                        return 'Error: Loop elements must have a caption.';
                    }
                }

                // (6)
                if (graphlib.alg.isAcyclic(graph.toGraphLib({ graphlib }))) {
                    return 'Error: Loop element must create a loop in the graph.';
                }

                // This below is a experimental check to see if the loop is really connected to the loop element via true link

                // Contains array of arrays - each one is array of ids of elements in the loop in reverse order - last one is loop element and after that is his successor
                const loops = graphlib.alg.findCycles(graph.toGraphLib({ graphlib }));
                // Check if the successor if connected to this loop element via the true branch, if not -> error

                // Check all arrays of `loops` and find the one that contains this loop element - serializedGraph.cells[i].id
                const currentLoop = loops.find((loop: Array<string>) => loop.includes(serializedGraph.cells[i].id)).reverse();
                const loopSuccessorId = currentLoop[currentLoop.length - 2]; // -2 because last element is loop element
                //const successor = graph.getCells().find(cell => cell.id == loopSuccessorId);

                // Check if the connection serializedGraph.cells[i] (loop element) and successor has caption 'true'
                const outgoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { outbound: true });
                const outLink1 = linkLabels.find((label: { id: string | number; }) => label.id == outgoingLinks[0].id);

                const trueBranch = outLink1.label === 'true' ? outgoingLinks[0] : outgoingLinks[1];

                // TODO: This isn't reliable when it comes to nested loops
                // if (trueBranch.attributes.target.id !== loopSuccessorId) {
                //     return 'Error: Loop element must be connected to the loop via true branch.';
                // }
            }
            // Check for merge element
            // (1) - merge needs to have at least 3 links
            // (2) - Inwards going links - at least 2
            // (3) - Outwards going links - at least 1
            else if (serializedGraph.cells[i]['name'] == 'merge') {
                let outgoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { outbound: true });
                let ingoingLinks = graph.getConnectedLinks(serializedGraph.cells[i], { inbound: true });

                // (1)
                if (links.length < 3) {
                    return 'Error: Merge element must have at least 3 connections (x going in and 1 going out).';
                }

                // (2)
                if (ingoingLinks.length <= 1) {
                    return 'Error: Merge element must have at least 2 connections going in.';
                }

                // (3)
                if (outgoingLinks.length != 1) {
                    return 'Error: Merge element must have exactly 1 connection going out.';
                }
            }
        }

        return '';
    }

    public generateCode(moduleName: string, blocks: Array<Block>, inputs: MatTableDataSource<InputOutput>, outputs: MatTableDataSource<InputOutput>, internalSignals: MatTableDataSource<InternalSignal>, parameters: MatTableDataSource<Parameter>, language: 'System Verilog' | 'VHDL' = 'System Verilog'): string {
        const INDENT_SIZE = 2;
        const INDENT = ' '.repeat(INDENT_SIZE);
        let indentLevel = 2;

        this.codeForFileHeader(INDENT, moduleName, inputs, outputs, internalSignals, parameters, language);

        blocks.forEach(block => {
            const serializedGraph = block.graph.toJSON();
            const graph = block.graph;
            const linkLabels = block.linkLabels;

            if (language === 'System Verilog') {
                let blockHeader = '';

                if (block.logic === 'sequential' && block?.sensitivityList?.clockSignal && block?.sensitivityList?.resetSignal) {
                    let clockEdge = block.sensitivityList.clockEdge === 'rising' ? 'posedge' : 'negedge';
                    let resetEdge = block.sensitivityList.resetValue === 'active-1' ? 'posedge' : 'negedge';

                    if (block.sensitivityList.resetType === 'async') {
                        blockHeader = `always_ff @(${clockEdge} ${block.sensitivityList.clockSignal ?? 'clk'} or ${resetEdge} ${block.sensitivityList.resetSignal ?? 'reset'})`;
                    } else {
                        blockHeader = `always_ff @(${clockEdge} ${block.sensitivityList.clockSignal ?? 'clk'})`;
                    }

                } else if (block.logic === 'sequential') {
                    blockHeader = 'always_ff @()';
                } else {
                    blockHeader = 'always_comb';
                }

                this.code += INDENT + `${blockHeader} begin\n`;
            } else if (language === 'VHDL') {
                const blockHeader = block.logic === 'combinational' ? 'process(all)' : `process(${block.sensitivityList?.clockSignal ?? 'clk', block.sensitivityList?.resetSignal ?? 'reset'})`;
                this.code += INDENT + `${blockHeader} begin\n`;
            }

            let startElement = serializedGraph.cells.find((element: { name: string }) => element.name == 'start');
            let element = this.getSuccessor(graph, startElement);

            while (element != undefined) {
                if (element.attributes?.['name'] === 'action') {
                    let actionCaption = element.attributes.attrs.label.text.replaceAll(' ', '');
                    // Check if user didn't forget semicolon
                    actionCaption[actionCaption.length - 1] == ';' ?
                        this.code += INDENT.repeat(2) + element.attributes.attrs.label.text + '\n' :
                        this.code += INDENT.repeat(2) + element.attributes.attrs.label.text + ';\n';
                } else if (element.attributes?.['name'] === 'if') {
                    let links = graph.getConnectedLinks(element, { outbound: true });
                    let link1Info = linkLabels.find((label: { id: string | number; }) => label.id == links[0].id);
                    let link2Info = linkLabels.find((label: { id: string | number; }) => label.id == links[1].id);
                    let trueBranch: joint.dia.Link | joint.dia.Cell;
                    let falseBranch: joint.dia.Link | joint.dia.Cell;;

                    // Find the first element in true and false branch
                    if (link1Info.label == 'true') {
                        // (1) - Determine which link is true/false
                        trueBranch = links.find((link: { id: any; }) => link.id == link1Info.id);
                        falseBranch = links.find((link: { id: any; }) => link.id == link2Info.id);
                        // (2) - Get the first element in true/false branch
                        trueBranch = graph.getCells().find(cell => cell.id == trueBranch?.attributes['target'].id);
                        falseBranch = graph.getCells().find(cell => cell.id == falseBranch?.attributes['target'].id);
                    } else if (link2Info.label == 'true') {
                        // (1) - Determine which link is true/false
                        trueBranch = links.find((link: { id: any; }) => link.id == link2Info.id);
                        falseBranch = links.find((link: { id: any; }) => link.id == link1Info.id);
                        // (2) - Get the first element in true/false branch
                        trueBranch = graph.getCells().find(cell => cell.id == trueBranch?.attributes['target'].id);
                        falseBranch = graph.getCells().find(cell => cell.id == falseBranch?.attributes['target'].id);
                    }

                    if (language === 'System Verilog') {
                        // True branch
                        this.code += INDENT.repeat(2) + 'if (' + element.attributes.attrs.label.text + ') begin\n';
                        this.codeForBranch(INDENT, indentLevel + 1, trueBranch, graph, linkLabels, false, language);
                        this.code += INDENT.repeat(2) + 'end\n';

                        // False branch
                        // check if false branch isn't directly connected to merge -> if yes no need to call anything
                        if (falseBranch?.attributes['name'] != 'merge' && falseBranch?.attributes['name'] != 'if') {
                            this.code += INDENT.repeat(2) + 'else begin\n';
                            this.codeForBranch(INDENT, indentLevel + 1, falseBranch, graph, linkLabels, false, language);
                            this.code += INDENT.repeat(2) + 'end\n';
                        }
                        // else if
                        else if (falseBranch?.attributes['name'] == 'if') {
                            this.code += INDENT.repeat(2) + 'else ';
                            this.codeForBranch(INDENT, indentLevel, falseBranch, graph, linkLabels, true, language);
                        }
                    } else if (language === 'VHDL') {
                        // True branch
                        this.code += INDENT.repeat(2) + 'if ' + element.attributes.attrs.label.text + ' then\n';
                        this.codeForBranch(INDENT, indentLevel + 1, trueBranch, graph, linkLabels, false, language);

                        // False branch
                        // check if false branch isn't directly connected to merge -> if yes no need to call anything
                        if (falseBranch?.attributes['name'] != 'merge' && falseBranch?.attributes['name'] != 'if') {
                            this.code += INDENT.repeat(2) + 'else\n';
                            this.codeForBranch(INDENT, indentLevel + 1, falseBranch, graph, linkLabels, false, language);
                            // This if is to make sure that there is just one end if, there was an issue with multiple ends and this was easiest fix
                            if (!this.code.endsWith('end if;\n')) {
                                this.code += INDENT.repeat(2) + 'end if;\n';
                            }
                        }
                        // else if 
                        else if (falseBranch?.attributes['name'] == 'if') {
                            this.code += INDENT.repeat(2) + 'els'
                            this.codeForBranch(INDENT, indentLevel, falseBranch, graph, linkLabels, true, language);
                            if (!this.code.endsWith('end if;\n')) {
                                this.code += INDENT.repeat(2) + 'end if;\n';
                            }
                        }

                        if (!this.code.endsWith('end if;\n')) {
                            this.code += INDENT.repeat(2) + 'end if;\n';
                        }
                    }

                    element = this.getSuccessor(graph, this.lastVisitedMerge);
                    continue;
                } else if (element.attributes?.['name'] === 'case') {
                    let links = graph.getConnectedLinks(element, { outbound: true });

                    if (language === 'System Verilog')
                        this.code += INDENT.repeat(2) + 'case (' + element.attributes.attrs.label.text + ')\n';
                    else
                        this.code += INDENT.repeat(2) + 'case ' + element.attributes.attrs.label.text + ' is\n';

                    for (let i = 0; i < links.length; i++) {
                        // (1) - Get the label of the link
                        let linkCaption = linkLabels.find((label: { id: string | number; }) => label.id == links[i].id);
                        // (2) - Get the target element of the link
                        let successor = graph.getCells().find(cell => cell.id == links[i].attributes['target'].id);
                        // (3) - Generate this.code for the branch

                        if (language === 'System Verilog') {
                            this.code += INDENT.repeat(3) + linkCaption.label + ' : begin\n';
                            this.codeForBranch(INDENT, indentLevel + 2, successor, graph, linkLabels, false, language);
                            this.code += INDENT.repeat(3) + 'end\n';
                        } else {
                            this.code += INDENT.repeat(3) + 'when ' + linkCaption.label + ' =>\n';
                            this.codeForBranch(INDENT, indentLevel + 2, successor, graph, linkLabels, false, language);
                        }
                    }

                    this.code += INDENT.repeat(2) + (language === 'System Verilog' ? 'endcase\n' : 'end case;\n');

                    element = this.getSuccessor(graph, this.lastVisitedMerge);
                    continue;
                } else if (element.attributes?.['name'] === 'loop') {
                    this.visitedLoops.push(element.id);

                    const links = graph.getConnectedLinks(element, { outbound: true });
                    const link1Info = linkLabels.find((label: { id: string | number; }) => label.id == links[0].id);
                    const link2Info = linkLabels.find((label: { id: string | number; }) => label.id == links[1].id);

                    // True branch contains the loop inself
                    let trueBranch: joint.dia.Link | joint.dia.Cell;
                    // False branch is just the next element after the loop
                    let falseBranch: joint.dia.Link | joint.dia.Cell;

                    if (link1Info.label === 'true') {
                        trueBranch = links.find((link: { id: any; }) => link.id == link1Info.id);
                        trueBranch = graph.getCells().find(cell => cell.id == trueBranch?.attributes['target'].id);

                        falseBranch = links.find((link: { id: any; }) => link.id == link2Info.id);
                        falseBranch = graph.getCells().find(cell => cell.id == falseBranch?.attributes['target'].id);
                    } else {
                        trueBranch = links.find((link: { id: any; }) => link.id == link2Info.id);
                        trueBranch = graph.getCells().find(cell => cell.id == trueBranch?.attributes['target'].id);

                        falseBranch = links.find((link: { id: any; }) => link.id == link1Info.id);
                        falseBranch = graph.getCells().find(cell => cell.id == falseBranch?.attributes['target'].id);
                    }

                    const loopBeginSyntax = language === 'System Verilog' ? 'begin' : 'loop';
                    const loopEndSyntax = language === 'System Verilog' ? 'end' : 'end loop;';

                    this.code += INDENT.repeat(2) + element.attributes.attrs.label.text + ' ' + loopBeginSyntax + '\n';
                    this.codeForBranch(INDENT, indentLevel + 1, trueBranch, graph, linkLabels, false, language);
                    this.code += INDENT.repeat(2) + loopEndSyntax + '\n';

                    // falseBranch in this case is element after the loop, the target of false link i.e. what should happen after loop
                    element = falseBranch;
                    continue;
                } else if (element.attributes?.['name'] === 'merge') {
                    console.log('Unexpected merge.');
                    break;
                } else if (element.attributes?.['name'] === 'end') {
                    break;
                }

                element = this.getSuccessor(graph, element);
            }

            if (language === 'System Verilog')
                this.code += INDENT + 'end\n\n';
            else if (language === 'VHDL')
                this.code += INDENT + 'end process;\n\n';
        });

        if (language === 'System Verilog')
            this.code += 'endmodule';
        else if (language === 'VHDL')
            this.code += 'end behavioral;';

        let finalCode: string = this.code;

        this.code = '';
        this.lastVisitedMerge = '';
        this.visitedLoops = [];

        return finalCode;
    }

    /** 
        * Generates code for file header i.e. module/entity declaration with inputs, outputs, parameters and internal signals based on language parameter
    */
    private codeForFileHeader(INDENT: string, moduleName: string, inputs: MatTableDataSource<InputOutput>, outputs: MatTableDataSource<InputOutput>, internalSignals: MatTableDataSource<InternalSignal>, parameters: MatTableDataSource<Parameter>, language: 'System Verilog' | 'VHDL' = 'System Verilog'): void {
        if (language === 'System Verilog') {
            // Generate code for parameters (System Verilog)
            if (parameters.data.length > 0) {
                this.code += `module ${moduleName ?? 'module_name'} #(\n`;
                for (let i = 0; i < parameters.data.length; i++) {
                    this.code += INDENT + 'parameter ' + parameters.data[i].type + ' ' + parameters.data[i].name + ' = ' + parameters.data[i].value;

                    i === parameters.data.length - 1 ? this.code += '\n' : this.code += ',\n';
                }
                this.code += ') (\n';
            } else {
                this.code += `module ${moduleName ?? 'module_name'} (\n`;
            }
        } else if (language === 'VHDL') {
            this.code += 'library ieee;\n';
            this.code += 'use ieee.std_logic_1164.all;\n\n';
            this.code += `entity ${moduleName ?? 'entity_name'} is\n`;

            // Generate code for parameters (VHDL)
            if (parameters.data.length > 0) {
                this.code += INDENT + 'generic (\n';
                for (let i = 0; i < parameters.data.length; i++) {
                    this.code += INDENT.repeat(2) + parameters.data[i].name + ' : ' + parameters.data[i].type + ' := ' + parameters.data[i].value + ';\n';
                }
                this.code += INDENT + ');\n';
            }

            this.code += INDENT + 'port (\n';
        }

        for (let i = 0; i < inputs.data.length; i++) {
            if (inputs.data[i].bits == '1') {
                if (language === 'System Verilog')
                    this.code += INDENT + `input ${inputs.data[i].type ?? 'logic'} ` + inputs.data[i].name;
                else if (language === 'VHDL')
                    this.code += INDENT.repeat(2) + inputs.data[i].name + ` : in ${inputs.data[i].type ?? 'std_logic'}`;

                if ((i == inputs.data.length - 1) && (outputs.data.length == 0)) {
                    this.code += '\n';
                } else {
                    this.code += ',\n';
                }
            } else {
                let bits: number | string = parseInt(inputs.data[i].bits);

                if (isNaN(bits)) {
                    bits = `${inputs.data[i].bits}-1`;
                } else {
                    bits = bits - 1;
                }

                if (language === 'System Verilog')
                    this.code += INDENT + `input ${inputs.data[i].type ?? 'logic'} ` + `[${bits}:0]` + ' ' + inputs.data[i].name;
                else if (language === 'VHDL')
                    this.code += INDENT.repeat(2) + inputs.data[i].name + ` : in ${inputs.data[i].type ?? 'std_logic_vector'}` + `(${bits} downto 0)`;

                if ((i == inputs.data.length - 1) && (outputs.data.length == 0)) {
                    this.code += '\n';
                } else {
                    this.code += ',\n';
                }
            }
        }

        for (let i = 0; i < outputs.data.length; i++) {
            if (outputs.data[i].bits == '1') {
                if (language === 'System Verilog')
                    this.code += INDENT + `output ${outputs.data[i].type ?? 'logic'} ` + outputs.data[i].name;
                else if (language === 'VHDL')
                    this.code += INDENT.repeat(2) + outputs.data[i].name + ` : out ${outputs.data[i].type ?? 'std_logic'}`;

                if ((i == outputs.data.length - 1)) {
                    this.code += '\n';
                } else {
                    this.code += ',\n';
                }

            } else {
                let bits: number | string = parseInt(outputs.data[i].bits);

                if (isNaN(bits)) {
                    bits = `${outputs.data[i].bits}-1`;
                } else {
                    bits = bits - 1;
                }

                if (language === 'System Verilog')
                    this.code += INDENT + `output ${outputs.data[i].type ?? 'logic'} ` + `[${bits}:0]` + ' ' + outputs.data[i].name;
                else if (language === 'VHDL')
                    this.code += INDENT.repeat(2) + outputs.data[i].name + ` : out ${outputs.data[i].type ?? 'std_logic_vector'}` + `(${bits} downto 0)`;

                if ((i == outputs.data.length - 1)) {
                    this.code += '\n';
                } else {
                    this.code += ',\n';
                }
            }
        }

        if (language === 'System Verilog') {
            this.code += ');\n\n';
        } else if (language === 'VHDL') {
            this.code += '  );\n';
            this.code += `end entity ${moduleName ?? 'entity_name'};\n\n`;

            this.code += `architecture behavioral of ${moduleName ?? 'entity_name'} is\n`;
        }

        for (let i = 0; i < internalSignals.data.length; i++) {
            if (internalSignals.data[i].bits == '1') {
                if (language === 'System Verilog')
                    this.code += INDENT + `${internalSignals.data[i].type ?? 'logic'} ` + internalSignals.data[i].name + ';\n';
                else if (language === 'VHDL')
                    this.code += INDENT + 'signal ' + internalSignals.data[i].name + ` : ${internalSignals.data[i].type ?? 'std_logic'};\n`;
            } else {
                let bits: number | string = parseInt(internalSignals.data[i].bits);

                if (isNaN(bits)) {
                    bits = `${internalSignals.data[i].bits}-1`;
                } else {
                    bits = bits - 1;
                }

                if (language === 'System Verilog')
                    this.code += INDENT + `${internalSignals.data[i].type ?? 'logic'} ` + `[${bits}:0]` + ' ' + internalSignals.data[i].name + ';\n';
                else if (language === 'VHDL')
                    this.code += INDENT + 'signal ' + internalSignals.data[i].name + ` : ${internalSignals.data[i].type ?? 'std_logic_vector'}` + `(${bits} downto 0);\n`;
            }
        }

        if (language === 'System Verilog')
            this.code += '\n';
        else if (language === 'VHDL')
            this.code += 'begin\n';

        return;
    }

    private codeForBranch(INDENT: string, indentLevel: number, element: any, graph: joint.dia.Graph, linkLabels: any, elseif: boolean, language: 'System Verilog' | 'VHDL' = 'System Verilog'): void {
        while (element != undefined) {
            if (element.attributes?.['name'] === 'action') {
                let actionCaption = element.attributes.attrs.label.text.replaceAll(' ', '');
                // Check if user didn't forget semicolon
                actionCaption[actionCaption.length - 1] == ';' ?
                    this.code += INDENT.repeat(indentLevel) + element.attributes.attrs.label.text + '\n' :
                    this.code += INDENT.repeat(indentLevel) + element.attributes.attrs.label.text + ';\n';
            } else if (element.attributes?.['name'] === 'if') {
                let links = graph.getConnectedLinks(element, { outbound: true });
                let link1Info = linkLabels.find((label: { id: string | number; }) => label.id == links[0].id);
                let link2Info = linkLabels.find((label: { id: string | number; }) => label.id == links[1].id);
                let trueBranch;
                let falseBranch;

                // Find the first element in true and false branch
                if (link1Info.label == 'true') {
                    // (1) - Determine which link is true/false
                    trueBranch = links.find((link: { id: any; }) => link.id == link1Info.id);
                    falseBranch = links.find((link: { id: any; }) => link.id == link2Info.id);
                    // (2) - Get the first element in true/false branch
                    trueBranch = graph.getCells().find(cell => cell.id == trueBranch?.attributes['target'].id);
                    falseBranch = graph.getCells().find(cell => cell.id == falseBranch?.attributes['target'].id);
                } else if (link2Info.label == 'true') {
                    // (1) - Determine which link is true/false
                    trueBranch = links.find((link: { id: any; }) => link.id == link2Info.id);
                    falseBranch = links.find((link: { id: any; }) => link.id == link1Info.id);
                    // (2) - Get the first element in true/false branch
                    trueBranch = graph.getCells().find(cell => cell.id == trueBranch?.attributes['target'].id);
                    falseBranch = graph.getCells().find(cell => cell.id == falseBranch?.attributes['target'].id);
                }

                if (language === 'System Verilog') {
                    // True branch
                    if (elseif == false) {
                        this.code += INDENT.repeat(indentLevel) + 'if (' + element.attributes.attrs.label.text + ') begin\n';
                        this.codeForBranch(INDENT, indentLevel + 1, trueBranch, graph, linkLabels, false);
                        this.code += INDENT.repeat(indentLevel) + 'end\n';
                    } else {
                        this.code += 'if (' + element.attributes.attrs.label.text + ') begin\n';
                        this.codeForBranch(INDENT, indentLevel + 1, trueBranch, graph, linkLabels, false);
                        this.code += INDENT.repeat(indentLevel) + 'end\n';
                    }

                    // False branch
                    // check if false branch isn't directly connected to merge -> if yes no need to call anything
                    if (falseBranch?.attributes['name'] != 'merge' && falseBranch?.attributes['name'] != 'if') {
                        this.code += INDENT.repeat(indentLevel) + 'else begin\n';
                        this.codeForBranch(INDENT, indentLevel + 1, falseBranch, graph, linkLabels, false, language);
                        this.code += INDENT.repeat(indentLevel) + 'end\n';
                    }
                    // else if
                    else if (falseBranch?.attributes['name'] == 'if') {
                        this.code += INDENT.repeat(indentLevel) + 'else ';
                        this.codeForBranch(INDENT, indentLevel, falseBranch, graph, linkLabels, true, language);
                    }
                } else if (language === 'VHDL') {
                    // True branch
                    if (elseif == false) {
                        this.code += INDENT.repeat(indentLevel) + 'if ' + element.attributes.attrs.label.text + ' then\n';
                        this.codeForBranch(INDENT, indentLevel + 1, trueBranch, graph, linkLabels, false);
                    } else {
                        this.code += 'if ' + element.attributes.attrs.label.text + ' then\n';
                        this.codeForBranch(INDENT, indentLevel + 1, trueBranch, graph, linkLabels, false);
                    }

                    // False branch
                    // check if false branch isn't directly connected to merge -> if yes no need to call anything
                    if (falseBranch?.attributes['name'] != 'merge' && falseBranch?.attributes['name'] != 'if') {
                        this.code += INDENT.repeat(indentLevel) + 'else\n';
                        this.codeForBranch(INDENT, indentLevel + 1, falseBranch, graph, linkLabels, false, language);
                        if (!this.code.endsWith('end if;\n')) {
                            this.code += INDENT.repeat(indentLevel) + 'end if;\n';
                        }
                    }
                    // else if 
                    else if (falseBranch?.attributes['name'] == 'if') {
                        this.code += INDENT.repeat(indentLevel) + 'els'
                        this.codeForBranch(INDENT, indentLevel, falseBranch, graph, linkLabels, true, language);
                        if (!this.code.endsWith('end if;\n')) {
                            this.code += INDENT.repeat(indentLevel) + 'end if;\n';
                        }
                    }

                    if (!this.code.endsWith('end if;\n')) {
                        this.code += INDENT.repeat(indentLevel) + 'end if;\n';
                    }
                }

                element = this.getSuccessor(graph, this.lastVisitedMerge);
                continue;
            } else if (element.attributes?.['name'] === 'case') {
                let links = graph.getConnectedLinks(element, { outbound: true });

                if (language === 'System Verilog')
                    this.code += INDENT.repeat(indentLevel) + 'case (' + element.attributes.attrs.label.text + ')\n';
                else
                    this.code += INDENT.repeat(indentLevel) + 'case ' + element.attributes.attrs.label.text + ' is\n';

                for (let i = 0; i < links.length; i++) {
                    // (1) - Get the label of the link
                    let linkCaption = linkLabels.find((label: { id: string | number; }) => label.id == links[i].id);
                    // (2) - Get the target element of the link
                    let successor = graph.getCells().find(cell => cell.id == links[i].attributes['target'].id);
                    // (3) - Generate this.code for the branch

                    if (language === 'System Verilog') {
                        this.code += INDENT.repeat(indentLevel + 1) + linkCaption.label + ' : begin\n';
                        this.codeForBranch(INDENT, indentLevel + 2, successor, graph, linkLabels, false, language);
                        this.code += INDENT.repeat(indentLevel + 1) + 'end\n';
                    } else {
                        this.code += INDENT.repeat(indentLevel + 1) + 'when ' + linkCaption.label + ' =>\n';
                        this.codeForBranch(INDENT, indentLevel + 2, successor, graph, linkLabels, false, language);
                    }
                }

                this.code += INDENT.repeat(indentLevel) + (language === 'System Verilog' ? 'endcase\n' : 'end case;\n');

                element = this.getSuccessor(graph, this.lastVisitedMerge);
                continue;
            } else if (element.attributes?.['name'] === 'loop') {
                if (this.visitedLoops.includes(element.id)) {
                    break;
                }

                this.visitedLoops.push(element.id);

                const links = graph.getConnectedLinks(element, { outbound: true });
                const link1Info = linkLabels.find((label: { id: string | number; }) => label.id == links[0].id);
                const link2Info = linkLabels.find((label: { id: string | number; }) => label.id == links[1].id);

                // True branch contains the loop inself
                let trueBranch: joint.dia.Link | joint.dia.Cell;
                // False branch is just the next element after the loop
                let falseBranch: joint.dia.Link | joint.dia.Cell;

                if (link1Info.label === 'true') {
                    trueBranch = links.find((link: { id: any; }) => link.id == link1Info.id);
                    trueBranch = graph.getCells().find(cell => cell.id == trueBranch?.attributes['target'].id);

                    falseBranch = links.find((link: { id: any; }) => link.id == link2Info.id);
                    falseBranch = graph.getCells().find(cell => cell.id == falseBranch?.attributes['target'].id);
                } else {
                    trueBranch = links.find((link: { id: any; }) => link.id == link2Info.id);
                    trueBranch = graph.getCells().find(cell => cell.id == trueBranch?.attributes['target'].id);

                    falseBranch = links.find((link: { id: any; }) => link.id == link1Info.id);
                    falseBranch = graph.getCells().find(cell => cell.id == falseBranch?.attributes['target'].id);
                }

                const loopBeginSyntax = language === 'System Verilog' ? 'begin' : 'loop';
                const loopEndSyntax = language === 'System Verilog' ? 'end' : 'end loop;';

                this.code += INDENT.repeat(indentLevel) + element.attributes.attrs.label.text + ' ' + loopBeginSyntax + '\n';
                this.codeForBranch(INDENT, indentLevel + 1, trueBranch, graph, linkLabels, false);
                this.code += INDENT.repeat(indentLevel) + loopEndSyntax + '\n';

                element = falseBranch;
                continue;
            } else if (element.attributes?.['name'] === 'merge') {
                this.lastVisitedMerge = element;
                break;
            } else if (element.attributes?.['name'] === 'end') {
                break;
            }

            element = this.getSuccessor(graph, element);
        }

        return;
    }

    private checkDataSourceTableFields(dataSource: MatTableDataSource<InputOutput | InternalSignal | Parameter>, type: string) {
        let containsAlphabet: RegExp = /[a-zA-Z]/;
        let containsAlphaNumeric: RegExp = /^[a-z0-9-_]+$/i;

        for (let i = 0; i < dataSource.data.length; i++) {
            if (dataSource.data[i].name == 'input' || dataSource.data[i].name == 'output') {
                return 'Error: "input" and "output" are reserved keywords.';
            }

            if (!containsAlphabet.test(dataSource.data[i].name[0])) {
                return 'Error: ' + type + ' name must start with a letter and contain only alphanumeric characters or underscores.';
            } else if (!containsAlphaNumeric.test(dataSource.data[i].name)) {
                return 'Error: ' + type + ' name must start with a letter and contain only alphanumeric characters or underscores.';
            }

            if (type === 'parameter') {
                if (isNaN(Number((dataSource.data[i] as Parameter).value)) || Number((dataSource.data[i] as Parameter).value) < 0) {
                    return 'Error: ' + type + ' value must be a number.';
                }
            }

            // else if (isNaN(Number((dataSource.data[i] as InputOutput)?.bits)) || Number((dataSource.data[i] as InputOutput)?.bits) < 1) {
            //     return 'Error: ' + type + ' bit size must be a positive integer.';
            // }
        }

        return '';
    }

    private checkDataSourceTablesUniqueNames(inputs: MatTableDataSource<InputOutput>, outputs: MatTableDataSource<InputOutput>, signals: MatTableDataSource<InternalSignal>, parameters: MatTableDataSource<Parameter>) {
        let names: string[] = [];

        inputs.data.forEach(input => names.push(input.name));
        outputs.data.forEach(output => names.push(output.name));
        signals.data.forEach(signal => names.push(signal.name));
        parameters.data.forEach(parameter => names.push(parameter.name));

        // Set can contain only unique values
        let uniqueNames = new Set(names);
        if (uniqueNames.size !== names.length) {
            return 'Error: Inputs, outputs, internal signals and parameters must have unique names.';
        }

        return '';
    }

    private getSuccessor(graph: joint.dia.Graph, element: any): any {
        let links = graph.getConnectedLinks(element, { outbound: true });

        if (links.length == 1) {
            let successor = links[0].attributes['target'].id;
            return graph.getCells().find(element => element.id == successor);
        } else if (links.length > 1) {
            let successors = [];
            for (let i = 0; i < links.length; i++) {
                let successor = graph.getCells().find(element => element.id == links[i].attributes['target'].id);
                successors.push(successor);
            }
            return successors;
        }
    }

}