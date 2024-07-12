import { ParseTree } from "antlr4ts/tree/ParseTree";
import { SysVerilogHDLVisitor } from "../editor/system_verilog/syntax-check/ANTLR/SysVerilogHDLVisitor";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { Always_constructContext, Assignment_statementContext, Block_statementContext, Dimension_plusContext, Do_loop_statementContext, For_loop_statementContext, Input_declarationContext, Integer_declarationContext, List_of_variable_descriptionsContext, Logic_declarationContext, Module_identifierContext, Net_typeContext, Output_declarationContext, Parameter_declarationContext, Real_declarationContext, Reg_declarationContext, Time_declarationContext, Variable_assignmentContext, While_loop_statementContext } from "../editor/system_verilog/syntax-check/ANTLR/SysVerilogHDLParser";
import { ParserRuleContext } from "antlr4ts";
import { DiagramElements } from "./types/diagram-elements.type";
import { GeneratedBlock } from "./types/generate-diagram.type";
import { InputOutputType, InternalSignalType, ParameterType } from "./types/data-source.type";
import { operators } from "./operators";



export class SystemVerilogVisitor implements SysVerilogHDLVisitor<void> {

    private id = 1;
    private formattedStatement = '';
    private svOperators = [
        ...operators.SystemVerilog["Arithmetic operators"],
        ...operators.SystemVerilog["Relational operators"],
        ...operators.SystemVerilog["Logical operators"],
        ...operators.SystemVerilog["Bitwise operators"],
        ...operators.SystemVerilog["Shift operators"],
        ...operators.SystemVerilog["Assignment operators"],
    ]

    public moduleName: string = '';

    public inputs: Array<{ type: InputOutputType, name: string, bits: string }> = [];
    public outputs: Array<{ type: InputOutputType, name: string, bits: string }> = [];
    public internalSignals: Array<{ type: InternalSignalType, name: string, bits: string }> = [];
    public parameters: Array<{ type: ParameterType, name: string, value: string }> = [];

    // Used to store always blocks
    public blocks: Array<GeneratedBlock> = [];
    // Used to store assign statements -> we will all of these into separate always_comb block
    public assignBlock: GeneratedBlock = {
        name: 'assignBlock',
        logic: 'combinational',
        statements: []
    };

    // When a node is visited
    visit(tree: ParseTree): void {
        // Module name
        if (tree.constructor.name === 'Module_identifierContext' || tree instanceof Module_identifierContext) {
            this.visitModule_identifier(tree as Module_identifierContext);
        }
        // Inputs
        else if (tree.constructor.name === 'Input_declarationContext' || tree instanceof Input_declarationContext) {
            this.visitInput_declaration(tree as Input_declarationContext);
        }
        // Outputs
        else if (tree.constructor.name === 'Output_declarationContext' || tree instanceof Output_declarationContext) {
            this.visitOutput_declaration(tree as Output_declarationContext);
        }
        // Parameters
        else if (tree.constructor.name === 'Parameter_declarationContext' || tree instanceof Parameter_declarationContext) {
            this.visitParameter_declaration(tree as Parameter_declarationContext);
        }
        // Always blocks
        else if (tree.constructor.name === 'Always_constructContext' || tree instanceof Always_constructContext) {
            this.visitAlways_construct(tree as Always_constructContext);
        }
        // Assign statements
        else if (tree.constructor.name === 'Variable_assignmentContext' || tree instanceof Variable_assignmentContext) {
            this.visitVariable_assignment(tree as Variable_assignmentContext);
        }
        // Internal signals - reg type
        else if (tree.constructor.name === 'Reg_declarationContext' || tree instanceof Reg_declarationContext) {
            this.visitReg_declaration(tree as Reg_declarationContext);
        }
        // Internal signals - logic type
        else if (tree.constructor.name === 'Logic_declarationContext' || tree instanceof Logic_declarationContext) {
            this.visitLogic_declaration(tree as Logic_declarationContext);
        }
        // Internal signals - integer type
        else if (tree.constructor.name === 'Integer_declarationContext' || tree instanceof Integer_declarationContext) {
            this.visitInteger_declaration(tree as Integer_declarationContext);
        }
        // Internal signals - real type
        else if (tree.constructor.name === 'Real_declarationContext' || tree instanceof Real_declarationContext) {
            this.visitReal_declaration(tree as Real_declarationContext);
        }
        // Internal signals - time type
        else if (tree.constructor.name === 'Time_declarationContext' || tree instanceof Time_declarationContext) {
            this.visitTime_declaration(tree as Time_declarationContext);
        }
        else if (tree instanceof ParserRuleContext) {
            this.visitChildren(tree);
        } else if (tree instanceof TerminalNode) {
            this.visitTerminal(tree);
        }
    }

    // Visit children of a node
    visitChildren(node: RuleNode): void {
        for (let i = 0; i < node.childCount; i++) {
            this.visit(node.getChild(i));
        }
    }

    // Visit a terminal node - no children
    visitTerminal(node: TerminalNode): void {
    }

    // ----------------- Visit specific nodes -----------------

    visitModule_identifier(ctx: Module_identifierContext) {
        this.moduleName = ctx.text;
    };

    visitInput_declaration(ctx: Input_declarationContext) {
        if (ctx.childCount < 2) return;

        // Initially TerminalNode
        let firstChild = ctx.getChild(0);
        // Initially Input_descriptionContext
        let secondChild = ctx.getChild(1);
        let thirdChild: ParseTree;

        // Safety check
        if (firstChild.text !== 'input') return;

        let inputType: string;
        let inputValue: number | string = 1;
        let inputName: string;

        const Net_declarationContext = secondChild.getChild(0);

        // type + name
        if (Net_declarationContext.childCount === 2) {
            firstChild = Net_declarationContext.getChild(0);
            secondChild = Net_declarationContext.getChild(1);

            inputType = firstChild.text;
            inputName = secondChild.text;

            if (!inputType || !inputName) return;

            this.inputs.push({ type: inputType as InputOutputType, name: inputName, bits: inputValue.toString() });
        }
        // type + range + name
        else if (Net_declarationContext.childCount === 3) {
            firstChild = Net_declarationContext.getChild(0);
            secondChild = Net_declarationContext.getChild(1);
            thirdChild = Net_declarationContext.getChild(2);

            inputType = firstChild.text;
            if (secondChild instanceof Dimension_plusContext) {
                const dimension = secondChild.text.replace('[', '').replace(']', '').split(':');
                // Dimension declared with numbers
                if (!isNaN(parseInt(dimension[0]))) {
                    inputValue = parseInt(dimension[0]) + 1;
                }
                // Dimension declared with parameters
                else {
                    inputValue = dimension[0].split('-')[0];
                }
            }
            inputName = thirdChild.text;

            if (!inputType || !inputName) return;

            this.inputs.push({ type: inputType as InputOutputType, name: inputName, bits: inputValue.toString() });
        }
    }

    visitOutput_declaration(ctx: Output_declarationContext) {
        if (ctx.childCount < 2) return;

        // Initially TerminalNode
        let firstChild = ctx.getChild(0);
        // Initially Output_descriptionContext
        let secondChild = ctx.getChild(1);
        let thirdChild: ParseTree;

        // Safety check
        if (firstChild.text !== 'output') return;

        let outputType: string;
        let outputValue: number | string = 1;
        let outputName: string;

        const Reg_declarationContext = secondChild.getChild(0);

        // type + name
        if (Reg_declarationContext.childCount === 2) {
            firstChild = Reg_declarationContext.getChild(0);
            secondChild = Reg_declarationContext.getChild(1);

            outputType = firstChild.text;
            outputName = secondChild.text;

            if (!outputType || !outputName) return;

            this.outputs.push({ type: outputType as InputOutputType, name: outputName, bits: outputValue.toString() });
        }
        // type + range + name
        else if (Reg_declarationContext.childCount === 3) {
            firstChild = Reg_declarationContext.getChild(0);
            secondChild = Reg_declarationContext.getChild(1);
            thirdChild = Reg_declarationContext.getChild(2);

            outputType = firstChild.text;
            if (secondChild instanceof Dimension_plusContext) {
                const dimension = secondChild.text.replace('[', '').replace(']', '').split(':');
                // Dimension declared with numbers
                if (!isNaN(parseInt(dimension[0]))) {
                    outputValue = parseInt(dimension[0]) + 1;
                }
                // Dimension declared with parameters
                else {
                    outputValue = dimension[0].split('-')[0];
                }
            }
            outputName = thirdChild.text;

            if (!outputType || !outputName) return;

            this.outputs.push({ type: outputType as InputOutputType, name: outputName, bits: outputValue.toString() });
        }
    }

    visitParameter_declaration(ctx: Parameter_declarationContext) {
        if (ctx.childCount < 2) return;

        // Initially TerminalNode
        let firstChild = ctx.getChild(0);
        // Initially Output_descriptionContext
        let secondChild = ctx.getChild(1);

        // Safety check
        if (firstChild.text !== 'parameter') return;

        let parameterType: string;
        let parameterName: string;
        let parameterValue = 1;

        const Parameter_declarationContext = secondChild.getChild(0);

        // For example `DATA_WIDTH=8`
        if (Parameter_declarationContext.childCount === 1) {
            // Hierarchical_variable_descriptionContext -> contains parameter name and value squished together
            firstChild = Parameter_declarationContext.getChild(0);
            const tokens = firstChild.text.split('=');

            parameterType = 'integer'; // default type
            parameterName = tokens[0];
            parameterValue = parseInt(tokens[1]);

            if (!parameterName || !parameterValue) return;

            this.parameters.push({ type: parameterType as ParameterType, name: parameterName, value: parameterValue.toString() });
        }
        // For example `integerCLK_FREQ=50`
        else if (Parameter_declarationContext.childCount === 2) {
            firstChild = Parameter_declarationContext.getChild(0);
            secondChild = Parameter_declarationContext.getChild(1);

            if (firstChild instanceof TerminalNode) parameterType = firstChild.text;
            if (secondChild instanceof List_of_variable_descriptionsContext) {
                const tokens = secondChild.text.split('=');

                parameterName = tokens[0];
                parameterValue = parameterType === 'integer' ? parseInt(tokens[1]) : parseFloat(tokens[1]);
            }

            if (!parameterType || !parameterName || !parameterValue) return;

            this.parameters.push({ type: parameterType as ParameterType, name: parameterName, value: parameterValue.toString() });
        }
    }

    visitAlways_construct(ctx: Always_constructContext) {
        // Should contain keyword context and statements
        if (ctx.childCount < 2) return;

        // Contains always keyword
        const alwaysKeywordContext = ctx.getChild(0);
        if (!alwaysKeywordContext.text.startsWith('always')) return;

        const statementStarContext = this.getStatementsParentFromAlwaysConstruct(ctx);

        if (!statementStarContext) return;

        const blockType = alwaysKeywordContext.text === 'always_ff' ? 'sequential' : 'combinational';

        this.blocks.push({
            name: `newBlock${this.blocks.length + 1}`,
            logic: blockType,
            statements: []
        });

        for (let i = 0; i < statementStarContext.childCount; i++) {
            const statement = statementStarContext.getChild(i);

            this.handleStatementContext(statement);
        }
    }

    visitVariable_assignment(ctx: Variable_assignmentContext) {
        if (ctx instanceof Variable_assignmentContext) {
            let text = '';

            this.formatStatement(ctx);
            text = this.formattedStatement;
            this.formattedStatement = '';

            this.assignBlock.statements.push({
                id: this.id++,
                elementType: 'action',
                text: text + (text.endsWith(';') ? '' : ';')
            });
        }
    }

    visitReg_declaration(ctx: Reg_declarationContext) {
        if (ctx.childCount < 2) return;

        if (ctx instanceof Reg_declarationContext) {
            let signalType: string;
            let signalName: string;
            let bitRange: number | string = 1;

            // 1 bit register
            if (ctx.childCount === 2) {
                const firstChild = ctx.getChild(0);
                const secondChild = ctx.getChild(1);

                if (firstChild instanceof TerminalNode) signalType = firstChild.text; // Always should be reg
                if (secondChild instanceof List_of_variable_descriptionsContext) signalName = this.handleSignalListOfVariableDescriptions(secondChild);

                if (!signalType || !signalName) return;

                this.internalSignals.push({ type: signalType as InternalSignalType, name: signalName, bits: bitRange.toString() });
            }
            // Register with range [x:y]
            else if (ctx.childCount === 3) {
                const firstChild = ctx.getChild(0);
                const secondChild = ctx.getChild(1);
                const thirdChild = ctx.getChild(2);

                if (firstChild instanceof TerminalNode) signalType = firstChild.text; // Always should be reg
                if (secondChild instanceof Dimension_plusContext) {
                    // // Dimension is in [x:y] format -> value is x + 1
                    const dimension = secondChild.text.replace('[', '').replace(']', '').split(':');
                    // Dimension declared with numbers
                    if (!isNaN(parseInt(dimension[0]))) {
                        bitRange = parseInt(dimension[0]) + 1;
                    }
                    // Dimension declared with parameters
                    else {
                        bitRange = dimension[0].split('-')[0];
                    }
                }
                if (thirdChild instanceof List_of_variable_descriptionsContext) signalName = this.handleSignalListOfVariableDescriptions(thirdChild);

                if (!signalType || !signalName) return;

                this.internalSignals.push({ type: signalType as InternalSignalType, name: signalName, bits: bitRange.toString() });
            }
        }
    }

    visitLogic_declaration(ctx: Logic_declarationContext) {
        if (ctx.childCount < 2) return;

        if (ctx instanceof Logic_declarationContext) {
            let signalType: string;
            let signalName: string;
            let bitRange: number | string = 1;

            // 1 bit logic
            if (ctx.childCount === 2) {
                const firstChild = ctx.getChild(0);
                const secondChild = ctx.getChild(1);

                if (firstChild instanceof TerminalNode) signalType = firstChild.text; // Always should be logic
                if (secondChild instanceof List_of_variable_descriptionsContext) signalName = this.handleSignalListOfVariableDescriptions(secondChild);

                if (!signalType || !signalName) return;

                this.internalSignals.push({ type: signalType as InternalSignalType, name: signalName, bits: bitRange.toString() });
            }
            // Logic with range [x:y]
            else if (ctx.childCount === 3) {
                const firstChild = ctx.getChild(0);
                const secondChild = ctx.getChild(1);
                const thirdChild = ctx.getChild(2);

                if (firstChild instanceof TerminalNode) signalType = firstChild.text; // Always should be logic
                if (secondChild instanceof Dimension_plusContext) {
                    // Dimension is in [x:y] format -> value is x + 1
                    const dimension = secondChild.text.replace('[', '').replace(']', '').split(':');
                    // Dimension declared with numbers
                    if (!isNaN(parseInt(dimension[0]))) {
                        bitRange = parseInt(dimension[0]) + 1;
                    }
                    // Dimension declared with parameters
                    else {
                        bitRange = dimension[0].split('-')[0];
                    }
                }
                if (thirdChild instanceof List_of_variable_descriptionsContext) signalName = this.handleSignalListOfVariableDescriptions(thirdChild);

                if (!signalType || !signalName) return;

                this.internalSignals.push({ type: signalType as InternalSignalType, name: signalName, bits: bitRange.toString() });
            }
        }
    }

    visitInteger_declaration(ctx: Integer_declarationContext) {
        if (ctx.childCount < 2) return;

        if (ctx instanceof Integer_declarationContext) {
            let signalType: string;
            let signalName: string;

            const firstChild = ctx.getChild(0);
            const secondChild = ctx.getChild(1);

            if (firstChild instanceof TerminalNode) signalType = firstChild.text; // Always should be integer
            if (secondChild instanceof List_of_variable_descriptionsContext) signalName = this.handleSignalListOfVariableDescriptions(secondChild);

            if (!signalType || !signalName) return;

            this.internalSignals.push({ type: signalType as InternalSignalType, name: signalName, bits: '1' });
        }
    }

    visitReal_declaration(ctx: Real_declarationContext) {
        if (ctx.childCount < 2) return;

        if (ctx instanceof Real_declarationContext) {
            let signalType: string;
            let signalName: string;

            const firstChild = ctx.getChild(0);
            const secondChild = ctx.getChild(1);

            if (firstChild instanceof TerminalNode) signalType = firstChild.text; // Always should be real
            if (secondChild instanceof List_of_variable_descriptionsContext) signalName = this.handleSignalListOfVariableDescriptions(secondChild);

            if (!signalType || !signalName) return;

            this.internalSignals.push({ type: signalType as InternalSignalType, name: signalName, bits: '1' });
        }
    }

    visitTime_declaration(ctx: Time_declarationContext) {
        if (ctx.childCount < 2) return;

        if (ctx instanceof Time_declarationContext) {
            let signalType: string;
            let signalName: string;

            const firstChild = ctx.getChild(0);
            const secondChild = ctx.getChild(1);

            if (firstChild instanceof TerminalNode) signalType = firstChild.text; // Always should be time
            if (secondChild instanceof List_of_variable_descriptionsContext) signalName = this.handleSignalListOfVariableDescriptions(secondChild);

            if (!signalType || !signalName) return;

            this.internalSignals.push({ type: signalType as InternalSignalType, name: signalName, bits: '1' });
        }
    }

    visitErrorNode(node: ErrorNode): void {
        throw new Error("Method not implemented.");
    }

    // ----------------- My util functions -----------------

    /**
     * Get seqBlockContext from always construct which holds all the statements
     */
    getStatementsParentFromAlwaysConstruct(ctx: Always_constructContext) {
        // In case of always_comb or always_ff : 
        //  - Always_constructContext -> [1]Statement_semicolonContext -> [1]StatementContext -> [0]Block_statementContext -> [0]Seq_blockContext -> [2]Statement_starContext
        // In case of always_ff@... -> needs specific behaviour to get the statements
        //  - Always_constructContext -> [1]Statement_semicolonContext -> [1]StatementContext -> [0]Procedural_statementContext -> [0]Procedural_timing_control_statementContext
        //      - [0]Delay_or_event_controlContext -> [0]Event_controlContext -> [0]Event_control_expressionContext ... if I want to get the contents of sensitivity list -> need to continue this
        //      - [1]Statement_semicolonContext -> [1]StatementContext -> [0]Block_statementContext -> [0]Seq_blockContext -> [2]Statement_starContext

        // When sensitivity list is specified with always_ff
        if (ctx.text.startsWith('always_ff@(')) {
            const statementSemicolonContext = ctx.getChild(1);
            if (statementSemicolonContext.childCount < 1) return;

            const statementContext = statementSemicolonContext.getChild(1);
            if (statementContext.childCount < 1) return;

            const proceduralStatementContext = statementContext.getChild(0);
            if (proceduralStatementContext.childCount < 1) return;

            const proceduralTimingControlStatementContext = proceduralStatementContext.getChild(0);
            if (proceduralTimingControlStatementContext.childCount < 2) return;

            const statementSemicolonContext2 = proceduralTimingControlStatementContext.getChild(1);
            if (statementSemicolonContext2.childCount < 1) return;

            const statementContext2 = statementSemicolonContext2.getChild(1);
            if (statementContext2.childCount < 1) return;

            const blockStatementContext = statementContext2.getChild(0);
            if (blockStatementContext.childCount < 1) return;

            const seqBlockContext = blockStatementContext.getChild(0);
            if (seqBlockContext.childCount < 4) return;

            const statementStarContext = seqBlockContext.getChild(2);

            return statementStarContext;
        } else {
            // Contains statements connected with semicolons -> one long string
            const statementSemicolonContext = ctx.getChild(1);
            if (statementSemicolonContext.childCount < 1) return;

            const statementContext = statementSemicolonContext.getChild(1);
            if (statementContext.childCount < 1) return;

            const blockStatementContext = statementContext.getChild(0);
            if (blockStatementContext.childCount < 1) return;

            const seqBlockContext = blockStatementContext.getChild(0);
            // Should have 4 children begin, empty char, statements and end
            if (seqBlockContext.childCount < 4) return;

            const statementStarContext = seqBlockContext.getChild(2);

            return statementStarContext;
        }
    }

    handleIfStatement(ctx: ParseTree, branch?: string, parentId?: number) {
        // If statement (ctx) is Statement_semicolonContext
        // We want to get/identify the condition of the statement and then true/false branches

        // How to get condition?
        //  - ctx -> [1]StatementContext -> [0]Flow_control_statementContext -> [0]Conditional_statementContext
        //      - [0]If_statementContext
        //          - [2]Conditional_statementContext -> this is the condition
        //          - [4]Statement_semicolonContext -> [1]Statement_context -> [0]Block_statementContext -> [0]Seq_blockContext -> [2]Statement_starContext - contents of this branch
        //      - [1]Else_statementContext
        //          - [1]Statement_semicolonContext -> rest is the same as above

        let isElseIf = false;

        let statementContext = ctx.getChild(1);
        const flowControlStatementContext = statementContext.getChild(0);
        const conditionalStatementContext = flowControlStatementContext.getChild(0);

        const ifStatementContext = conditionalStatementContext.getChild(0);
        const condition = ifStatementContext.getChild(2).text;

        let trueBranchStatements: ParseTree;
        let falseBranchStatements: ParseTree;

        // True branch
        let statementSemicolonContext = ifStatementContext.getChild(4);
        statementContext = statementSemicolonContext.getChild(1);
        let blockStatementContext: ParseTree
        let seqBlockContext: ParseTree
        let statementStarContext: ParseTree

        // True branch has one statement without begin
        if (statementContext.getChild(0) instanceof Assignment_statementContext) {
            trueBranchStatements = statementContext.getChild(0);
        }
        // Starts with begin
        else {
            blockStatementContext = statementContext.getChild(0);
            seqBlockContext = blockStatementContext.getChild(0);
            statementStarContext = seqBlockContext.getChild(2);

            trueBranchStatements = statementStarContext;
        }

        // Has else statement
        if (conditionalStatementContext.childCount === 2) {
            // False branch
            const elseStatementContext = conditionalStatementContext.getChild(1);
            statementSemicolonContext = elseStatementContext.getChild(1);

            if (statementSemicolonContext.text.startsWith('if')) {
                isElseIf = true;
            } else {

                // False branch has one statement without begin
                if (statementSemicolonContext.getChild(1).getChild(0) instanceof Assignment_statementContext) {
                    falseBranchStatements = statementSemicolonContext.getChild(1);
                } else {
                    statementContext = statementSemicolonContext.getChild(1);
                    blockStatementContext = statementContext.getChild(0);
                    seqBlockContext = blockStatementContext.getChild(0);
                    statementStarContext = seqBlockContext.getChild(2);

                    falseBranchStatements = statementStarContext;
                }
            }
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
            this.handleIfStatement(statementSemicolonContext, 'false', currentIfId);
        }

        for (let i = 0; i < trueBranchStatements?.childCount; i++) {
            const statement = trueBranchStatements.getChild(i);

            this.handleStatementContext(statement, 'true', currentIfId);
        }

        for (let i = 0; i < falseBranchStatements?.childCount; i++) {
            const statement = falseBranchStatements.getChild(i);

            this.handleStatementContext(statement, 'false', currentIfId);
        }
    }

    handleCaseStatement(ctx: ParseTree, branch?: string, parentId?: number) {
        // ctx is Statement_semicolonContext
        //  -> [1]StatementContext -> [0]Flow_control_statementContext -> [0]Case_statementContext
        //      -> [0]Any_case_keywordContext -> Double check if it's case
        //      -> [2]Case_switchContext -> Contains the condition of this case
        //      -> [4]Case_item_starContext -> Contains all branches
        //          Then each branch is a Case_itemContext
        //          -> [0] Either Case_item_keyContext (branch condition) or TerminalNode (default)
        //          -> [1] TerminalNode -> Colon we don't need that
        //          -> [2] Statement_semicolonContext
        //              -> [1] StatementContext -> Can start with begin or just statement
        //                  -> If it starts with begin there can be multiple statements
        //                      -> [0] Block_statementContext -> [0]Seq_blockContext -> [2]Statement_starContext -> each child is a statement (Statement_semicolonContext)
        //                  -> If it's just statement then it's one statement -> take StatementContext.text

        const statementContext = ctx.getChild(1);
        const flowControlStatementContext = statementContext.getChild(0);
        const caseStatementContext = flowControlStatementContext.getChild(0);

        const anyCaseKeywordContext = caseStatementContext.getChild(0);

        if (!anyCaseKeywordContext.text.startsWith('case')) return;

        const caseCondition = caseStatementContext.getChild(2); // Case_switchContext

        const caseItemStarContext = caseStatementContext.getChild(4);

        const currentCaseId = this.id++;

        this.blocks[this.blocks.length - 1].statements.push({
            id: currentCaseId,
            elementType: 'case',
            text: caseCondition.text,
            parentId: parentId,
            branch: branch,
        });

        for (let i = 0; i < caseItemStarContext.childCount; i++) {
            const caseItemContext = caseItemStarContext.getChild(i);
            const branchCondition = caseItemContext.getChild(0).text;

            let statementSemicolonContext = caseItemContext.getChild(2);
            const statementContext = statementSemicolonContext.getChild(1);

            // Branch starts with begin -> it can have one or multiple statements
            if (statementContext.text.startsWith('begin')) {
                const blockStatementContext = statementContext.getChild(0);
                const seqBlockContext = blockStatementContext.getChild(0);
                const statementStarContext = seqBlockContext.getChild(2);

                for (let j = 0; j < statementStarContext.childCount; j++) {
                    let statementSemicolonContext = statementStarContext.getChild(j);

                    this.handleStatementContext(statementSemicolonContext, branchCondition, currentCaseId);
                }
            }
            // Only one statement
            else {
                this.handleStatementContext(statementContext, branchCondition, currentCaseId);
            }
        }
    }

    handleLoop(ctx: ParseTree, branch?: string, parentId?: number) {
        // ctx is Statement_semicolonContext

        // ctx -> [1]StatementContext -> [0]Flow_control_statementContext -> [0]Loop_statementContext
        //  -> [0]For_loop_statementContext
        //      -> [2]Loop_init_assignmentContext -> Defines loop variable for example i = 0
        //      -> [4]Loop_terminate_expressionContext -> Condition for loop termination for example i < 10
        //      -> [6]Loop_step_assignmentContext -> Step for loop variable for example i++
        //      -> [8]Statement_semicolonContext -> Contains for loop body
        //          -> [1]StatementContext 
        //             Contains multiple statements: -> [0]Block_statementContext -> [0]Seq_blockContext -> [2]Statement_starContext -> each child is a statement (Statement_semicolonContext)
        //             Contains one statement: [0]AssignmentContext
        //  -> [0]While_loop_statementContext
        //      ->[2]Loop_terminate_expressionContext
        //      ->[4]Statement_semicolonContext
        //          ->[1]StatementContext
        //              -> Contains multiple statements: same as for
        //              -> Contains one statement: same as for
        //  -> [0]Do_while_loop_statementContext
        //      -> [1]Statement_semicolonContext
        //          ->[1]StatementContext
        //              -> Contains multiple statements: same as for
        //              -> Contains one statement: same as for
        //      -> [4]Loop_terminate_expressionContext

        const statementContext = ctx.getChild(1);
        const flowControlStatementContext = statementContext.getChild(0);
        const loopStatementContext = flowControlStatementContext.getChild(0);

        const loop = loopStatementContext.getChild(0);

        const currentLoopId = this.id++;

        if (loop instanceof For_loop_statementContext) {
            const loopInitAssignmentContext = loop.getChild(2);
            const loopTerminateExpressionContext = loop.getChild(4);
            const loopStepAssignmentContext = loop.getChild(6);

            let loopText = '';

            // In this case we need to split the type from the variable and initial value
            if (loopInitAssignmentContext.text.startsWith('integer')) {
                const declarativeAssignmentContext = loopInitAssignmentContext.getChild(0);
                const integerDeclarationContext = declarativeAssignmentContext.getChild(0);

                const type = integerDeclarationContext.getChild(0).text;
                const variable = integerDeclarationContext.getChild(1).text;

                loopText = `for(${type} ${variable}; ${loopTerminateExpressionContext.text}; ${loopStepAssignmentContext.text})`;
            } else {
                loopText = `for(${loopInitAssignmentContext.text}; ${loopTerminateExpressionContext.text}; ${loopStepAssignmentContext.text})`;
            }

            this.blocks[this.blocks.length - 1].statements.push({
                id: currentLoopId,
                elementType: 'loop',
                text: loopText,
                parentId: parentId,
                branch: branch
            });

            const statementSemicolonContext = loop.getChild(8);
            const statementContext = statementSemicolonContext.getChild(1);

            const statementContextChild = statementContext.getChild(0);

            // Multiple statement loop - for more see the comments at the top of the function
            if (statementContextChild instanceof Block_statementContext) {
                const seqBlockContext = statementContextChild.getChild(0);
                const statementStarContext = seqBlockContext.getChild(2);

                for (let i = 0; i < statementStarContext.childCount; i++) {
                    this.handleStatementContext(statementStarContext.getChild(i), branch, currentLoopId);
                }
            } else {
                this.handleStatementContext(statementContextChild, branch, currentLoopId);
            }

        } else if (loop instanceof While_loop_statementContext) {
            const loopTerminateExpressionContext = loop.getChild(2);

            const loopText = `while(${loopTerminateExpressionContext.text})`;

            this.blocks[this.blocks.length - 1].statements.push({
                id: currentLoopId,
                elementType: 'loop',
                text: loopText,
                parentId: parentId,
                branch: branch
            });

            const statementSemicolonContext = loop.getChild(4);
            const statementContext = statementSemicolonContext.getChild(1);

            const statementContextChild = statementContext.getChild(0);

            // Multiple statement loop - for more see the comments at the top of the function
            if (statementContextChild instanceof Block_statementContext) {
                const seqBlockContext = statementContextChild.getChild(0);
                const statementStarContext = seqBlockContext.getChild(2);

                for (let i = 0; i < statementStarContext.childCount; i++) {
                    this.handleStatementContext(statementStarContext.getChild(i), branch, currentLoopId);
                }
            } else {
                this.handleStatementContext(statementContextChild, branch, currentLoopId);
            }
        } else if (loop instanceof Do_loop_statementContext) {
            const loopTerminateExpressionContext = loop.getChild(4);

            // We will consider this while loop, in the diagram it will look the same
            const loopText = `while(${loopTerminateExpressionContext.text})`;

            this.blocks[this.blocks.length - 1].statements.push({
                id: currentLoopId,
                elementType: 'loop',
                text: loopText,
                parentId: parentId,
                branch: branch
            });

            const statementSemicolonContext = loop.getChild(1);
            const statementContext = statementSemicolonContext.getChild(1);

            const statementContextChild = statementContext.getChild(0);

            // Multiple statement loop - for more see the comments at the top of the function
            if (statementContextChild instanceof Block_statementContext) {
                const seqBlockContext = statementContextChild.getChild(0);
                const statementStarContext = seqBlockContext.getChild(2);

                for (let i = 0; i < statementStarContext.childCount; i++) {
                    this.handleStatementContext(statementStarContext.getChild(i), branch, currentLoopId);
                }
            } else {
                this.handleStatementContext(statementContextChild, branch, currentLoopId);
            }
        }
    }

    handleStatementContext(ctx: ParseTree, branch?: string, parentId?: number) {
        if (ctx.text.startsWith('if')) {
            this.handleIfStatement(ctx, branch, parentId);
        } else if (ctx.text.startsWith('case')) {
            this.handleCaseStatement(ctx, branch, parentId)
        } else if (ctx.text.startsWith('for') || ctx.text.startsWith('while') || ctx.text.startsWith('do')) {
            this.handleLoop(ctx, branch, parentId);
        } else {
            // It's just a line of code -> action element
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

    // This is specific to internal signals - we want to get the variable/signal name without it's value
    handleSignalListOfVariableDescriptions(ctx: List_of_variable_descriptionsContext) {
        if (!(ctx instanceof List_of_variable_descriptionsContext)) return;

        const variableDescriptionContext = ctx.getChild(0);

        if (variableDescriptionContext.childCount === 1) {
            return ctx.text;
        } else if (variableDescriptionContext.childCount === 3) {
            const variableIdentifierContext = variableDescriptionContext.getChild(0);
            return variableIdentifierContext.text;
        }

        return ctx.text;
    }

    formatStatement(ctx: ParseTree) {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);

            if (child instanceof TerminalNode && child.text !== undefined) {
                if (this.svOperators.includes(child.text)) {
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