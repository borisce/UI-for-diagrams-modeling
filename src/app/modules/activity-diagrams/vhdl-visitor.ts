import { ParseTree } from "antlr4ts/tree/ParseTree";
import { vhdlVisitor } from "../editor/vhdl/syntax-check/ANTLR/vhdlVisitor";
import { InputOutputType, InternalSignalType, ParameterType } from "./types/data-source.type";
import { GeneratedBlock } from "./types/generate-diagram.type";
import { ParserRuleContext } from "antlr4ts";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Case_statementContext, Case_statement_alternativeContext, Entity_declarationContext, IdentifierContext, If_statementContext, Interface_constant_declarationContext, Interface_port_declarationContext, Loop_statementContext, Process_statementContext, Process_statement_partContext, Signal_declarationContext } from "../editor/vhdl/syntax-check/ANTLR/vhdlParser";
import { operators } from "./operators";

export class VHDLVisitor implements vhdlVisitor<void> {

    private id = 1;
    private formattedStatement = '';
    private vhdlOpetators = [
        ...operators.VHDL["Arithmetic operators"],
        ...operators.VHDL["Relational operators"],
        ...operators.VHDL["Logical operators"],
        ...operators.VHDL["Bitwise operators"],
        ...operators.VHDL["Shift operators"],
        ...operators.VHDL["Assignment operators"],
    ]

    // We use moduleName even if it's entity name out of ease since we instantiate VHDLVisitor or SystemVerilogVisitor to one 
    // variable in diagram-generation.service.ts
    public moduleName: string = '';

    public inputs: Array<{ type: InputOutputType, name: string, bits: string }> = [];
    public outputs: Array<{ type: InputOutputType, name: string, bits: string }> = [];
    public internalSignals: Array<{ type: InternalSignalType, name: string, bits: string }> = [];
    public parameters: Array<{ type: ParameterType, name: string, value: string }> = [];

    // Used to store blocks (processes)
    public blocks: Array<GeneratedBlock> = [];

    // TODO: check if VHDL has the equivalent of assign statements
    public assignBlock: GeneratedBlock = {
        name: 'assignBlock',
        logic: 'combinational',
        statements: []
    };


    visit(tree: ParseTree): void {
        // Entity declaration - we want to get the name
        if (tree.constructor.name === 'Entity_declarationContext' || tree instanceof Entity_declarationContext) {
            this.visitEntity_declaration(tree as Entity_declarationContext);
        }

        // Port declaration
        if (tree.constructor.name === 'Interface_port_declarationContext' || tree instanceof Interface_port_declarationContext) {
            this.visitInterface_port_declaration(tree as Interface_port_declarationContext);
        }
        // Parameter declaration
        else if (tree.constructor.name === 'Interface_constant_declarationContext' || tree instanceof Interface_constant_declarationContext) {
            this.visitInterface_constant_declaration(tree as Interface_constant_declarationContext);
        }
        // Signal declaration - a single internal signal
        else if (tree.constructor.name === 'Signal_declarationContext' || tree instanceof Signal_declarationContext) {
            this.visitSignal_declaration(tree as Signal_declarationContext);
        }
        // Processes i.e. blocks
        else if (tree.constructor.name === 'Process_statementContext' || tree instanceof Process_statementContext) {
            this.visitProcess_statement(tree as Process_statementContext);
        }
        else if (tree instanceof ParserRuleContext) {
            this.visitChildren(tree);
        } else if (tree instanceof TerminalNode) {
            this.visitTerminal(tree);
        }
    }

    visitChildren(tree: ParseTree): void {
        for (let i = 0; i < tree.childCount; i++) {
            this.visit(tree.getChild(i));
        }
    }

    visitTerminal(tree: ParseTree): void {
    }

    visitErrorNode(tree: ParseTree): void {
    }

    // ------------------- Visit specific nodes -------------------

    visitEntity_declaration(ctx: Entity_declarationContext) {
        // We want to retrieve entity name here
        const identifierContext = ctx.getChild(1);

        if (identifierContext instanceof IdentifierContext) {
            this.moduleName = identifierContext.text;
        }
    }

    visitInterface_port_declaration(ctx: Interface_port_declarationContext) {
        if (ctx.childCount < 4) return;

        let portName: string;
        let portDirection: string;
        let portType: string;
        let portBits: string;

        const nameChild = ctx.getChild(0);
        const directionChild = ctx.getChild(2);
        const typeChild = ctx.getChild(3);

        // Port has bit range
        if (typeChild.childCount > 1) {
            portName = nameChild.text;
            portDirection = directionChild.text;
            portType = typeChild.getChild(0).text;
            portBits = this.getBitsFromRange(typeChild.getChild(1).text);
        } else {
            portName = nameChild.text;
            portDirection = directionChild.text;
            portType = typeChild.text;
            portBits = '1';
        }

        if (!portName || !portDirection || !portType) return;


        if (portDirection === 'in') {
            this.inputs.push({ name: portName, type: portType as InputOutputType, bits: portBits });
        } else if (portDirection === 'out') {
            this.outputs.push({ name: portName, type: portType as InputOutputType, bits: portBits });
        } else if (portDirection === 'inout') {
            this.inputs.push({ name: portName, type: portType as InputOutputType, bits: portBits });
        }
    }

    visitInterface_constant_declaration(ctx: Interface_constant_declarationContext) {
        if (ctx.childCount < 5) return;

        // Parameters are like: PARAM_NAME:PARAM_TYPE:=PARAM_VALUE;
        // As far as I know they need to have type specified in VHDL, in SystemVerilog they don't that's why we did additional checks there
        const parameterName = ctx.getChild(0).text;
        const parameterType = ctx.getChild(2).text;
        const parameterValue = ctx.getChild(4).text;

        if (!parameterName || !parameterType || !parameterValue) return;

        this.parameters.push({ name: parameterName, type: parameterType as ParameterType, value: parameterValue });
    }

    visitSignal_declaration(ctx: Signal_declarationContext) {
        if (ctx.childCount < 5 || ctx.getChild(0).text !== 'signal') return;

        let signalName: string;
        let signalType: string;
        let signalBits: string;

        const nameChild = ctx.getChild(1);
        const typeChild = ctx.getChild(3);

        // Signal has bit range
        if (typeChild.childCount > 1) {
            signalName = nameChild.text;
            signalType = typeChild.getChild(0).text;
            signalBits = this.getBitsFromRange(typeChild.getChild(1).text);
        } else {
            signalName = nameChild.text;
            signalType = typeChild.text;
            signalBits = '1';
        }

        if (!signalName || !signalType || !signalBits) return;

        this.internalSignals.push({ name: signalName, type: signalType as InternalSignalType, bits: signalBits });
    }

    visitProcess_statement(ctx: Process_statementContext) {
        // Determine block logic
        const processSensitivityList = ctx.getChild(2).text;
        const sequentialKeywords = ['clock', 'clk', 'rst', 'reset'];
        const blockLogic = sequentialKeywords.some(keyword => processSensitivityList.includes(keyword)) ? 'sequential' : 'combinational';

        // Get block statements
        const processStatementPartContext = ctx.getChild(6);

        if (!(processStatementPartContext instanceof Process_statement_partContext)) return;

        this.blocks.push({
            name: `newBlock${this.blocks.length + 1}`,
            logic: blockLogic,
            statements: []
        });

        for (let i = 0; i < processStatementPartContext.childCount; i++) {
            const statement = processStatementPartContext.getChild(i);

            this.handleStatementContext(statement);
        }
    }

    // ------------------- Helpers -------------------

    handleIfStatement(ctx: ParseTree, branch?: string, parentId?: number) {
        // This is completely different to SystemVerilog structure
        // - in SV the else if is a separate if statement - there is nesting in the structure itself
        // - in VHDL it's all in one if statement - flat list with repeating pattern

        // We want to get/identify the condition of the statement and then true/false branches and get their contents

        // ctx -> [0]If_statementContext
        //          -> [1]ConditionContext -> Contains the condition of the if
        //          -> [3]Sequence_of_statementsContext -> Contains the true branch
        //          -> [4]TerminalNode - 'end' if it's just if
        //
        //          -> [4]TerminalNode - 'else' if there's else
        //          -> [5]Sequence_of_statementsContext -> Contains the false branch in case of else
        //
        //          -> [4]TerminalNode - 'elsif' if there's else if
        //          -> [5]ConditionContext -> Contains the condition of the else if
        //          -> [7]Sequence_of_statementsContext -> Contains the true branch of the else if
        //          And it can continue with multiple elsif and potential else at the end

        // Safety
        if (!(ctx.getChild(0) instanceof If_statementContext)) return;

        let isElseIf = false;

        const ifStatementContext = ctx.getChild(0);
        let condition = ifStatementContext.getChild(1).text;

        // True branch
        const trueBranchStatements = ifStatementContext.getChild(3);
        let falseBranchStatements: ParseTree;

        // This determines what kind of if this is - if, else if, else
        let terminalNode = ifStatementContext.getChild(4);

        if (terminalNode.text === 'else') {
            falseBranchStatements = ifStatementContext.getChild(5);
        } else if (terminalNode.text === 'elsif') {
            isElseIf = true;
        }

        const currentIfId = this.id++;

        this.blocks[this.blocks.length - 1].statements.push({
            id: currentIfId,
            elementType: 'if',
            text: condition,
            parentId: parentId ?? null,
            branch: branch
        });

        if (isElseIf) {
            let currentElseIfId: number;
            let previousElseIfId: number;

            // Get all children and iterate from [4] since else ifs can repeat themselves, they arent nested
            for (let i = 4; i < ifStatementContext.childCount; i += 4) {
                // This tels us if it's elsif or else
                terminalNode = ifStatementContext.getChild(i);

                if (terminalNode.text === 'elsif') {
                    condition = ifStatementContext.getChild(i + 1).text;
                    const trueBranchStatements = ifStatementContext.getChild(i + 3);

                    currentElseIfId = this.id++;

                    this.blocks[this.blocks.length - 1].statements.push({
                        id: currentElseIfId,
                        elementType: 'if',
                        text: condition,
                        parentId: i === 4 ? currentIfId : previousElseIfId,
                        branch: 'false'
                    });

                    for (let j = 0; j < trueBranchStatements.childCount; j++) {
                        const statement = trueBranchStatements.getChild(j);

                        this.handleStatementContext(statement, 'true', currentElseIfId);
                    }

                    previousElseIfId = currentElseIfId;
                } else if (terminalNode.text === 'else') {
                    falseBranchStatements = ifStatementContext.getChild(i + 1);

                    for (let j = 0; j < falseBranchStatements.childCount; j++) {
                        const statement = falseBranchStatements.getChild(j);

                        this.handleStatementContext(statement, 'false', currentElseIfId);
                    }
                }
            }
        }

        // Contents of the true branch of the current top level if
        if (trueBranchStatements && trueBranchStatements?.childCount > 0) {
            for (let i = 0; i < trueBranchStatements.childCount; i++) {
                const statement = trueBranchStatements.getChild(i);

                this.handleStatementContext(statement, 'true', currentIfId);
            }
        }

        // Contents of the false branch of the current top level if. Not else-if!
        if (!isElseIf && falseBranchStatements && falseBranchStatements?.childCount > 0) {
            for (let i = 0; i < falseBranchStatements.childCount; i++) {
                const statement = falseBranchStatements.getChild(i);

                this.handleStatementContext(statement, 'false', currentIfId);
            }
        }
    }

    handleCaseStatement(ctx: ParseTree, branch?: string, parentId?: number) {
        // Get case condition
        // Get case branches conditions
        // Get condition for each branch

        // Safety check
        if (!(ctx.getChild(0) instanceof Case_statementContext)) return;

        const caseStatementContext = ctx.getChild(0);
        const caseCondition = caseStatementContext.getChild(1).text;

        let currentCaseId = this.id++;

        this.blocks[this.blocks.length - 1].statements.push({
            id: currentCaseId,
            elementType: 'case',
            text: caseCondition,
            parentId: parentId ?? null,
            branch: branch
        });

        // Get case branches
        let caseBranches: Array<ParseTree> = [];

        for (let i = 2; i < caseStatementContext.childCount; i++) {
            if (caseStatementContext.getChild(i) instanceof Case_statement_alternativeContext) {
                caseBranches.push(caseStatementContext.getChild(i));
            }
        }

        for (let i = 0; i < caseBranches.length; i++) {
            const condition = caseBranches[i].getChild(1).text;
            const branchStatements = caseBranches[i].getChild(3);

            for (let j = 0; j < branchStatements.childCount; j++) {
                const statement = branchStatements.getChild(j);

                this.handleStatementContext(statement, condition, currentCaseId);
            }
        }
    }

    handleLoopStatement(ctx: ParseTree, branch?: string, parentId?: number) {
        //Safety check
        if (!(ctx.getChild(0) instanceof Loop_statementContext)) return;

        const loopStatementContext = ctx.getChild(0);
        const loopDefinition = loopStatementContext.getChild(0);

        const loopType = loopDefinition.getChild(0).text;
        const loopParameters = loopDefinition.getChild(1);
        const loopStatements = loopStatementContext.getChild(2);

        let loopText: string;

        if (loopType === 'for') {
            const loopVariable = loopParameters.getChild(0).text;
            const loopRange = loopParameters.getChild(2).text.split('to');

            loopText = `${loopType} ${loopVariable} in ${loopRange[0]} to ${loopRange[1]}`;
        } else if (loopType === 'while') {
            loopText = `${loopType} ${loopParameters.text}`;
        }

        let currentLoopId = this.id++;

        this.blocks[this.blocks.length - 1].statements.push({
            id: currentLoopId,
            elementType: 'loop',
            text: loopText,
            parentId: parentId ?? null,
            branch: branch
        });

        for (let i = 0; i < loopStatements.childCount; i++) {
            const statement = loopStatements.getChild(i);

            this.handleStatementContext(statement, branch, currentLoopId);
        }
    }

    handleStatementContext(ctx: ParseTree, branch?: string, parentId?: number) {
        if (ctx.text.startsWith('if')) {
            this.handleIfStatement(ctx, branch, parentId);
        } else if (ctx.text.startsWith('case')) {
            this.handleCaseStatement(ctx, branch, parentId);
        } else if (ctx.text.startsWith('for') || ctx.text.startsWith('while')) {
            this.handleLoopStatement(ctx, branch, parentId);
        } else {
            // Regular line of code -> will be action statement
            let text = '';

            this.formatStatement(ctx);
            text = this.formattedStatement;
            this.formattedStatement = '';


            this.blocks[this.blocks.length - 1].statements.push({
                id: this.id++,
                elementType: 'action',
                text: text + (text.endsWith(';') ? '' : ';'),
                parentId: parentId,
                branch: branch
            });
        }
    }

    getBitsFromRange(range: string): string {
        // Range looks like this: (7 downto 0)
        let tmp: any = range.substring(1, range.length - 1) // Remove brackets
        tmp = tmp.split('downto');

        return isNaN(parseInt(tmp[0])) ? '2' : (parseInt(tmp[0]) + 1).toString();
    }

    formatStatement(ctx: ParseTree) {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);

            if (child instanceof TerminalNode && child.text !== undefined) {
                if (this.vhdlOpetators.includes(child.text)) {
                    this.formattedStatement += ' ' + child.text + ' ';
                } else {
                    this.formattedStatement += child.text ?? '';
                }
            } else {
                this.formatStatement(child);
            }
        }
    }
}