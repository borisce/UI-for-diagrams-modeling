import {Component} from '@angular/core';
import {GenerateDiagramSchema} from '../other-classes/GenerateDiagramSchema';
import {OutputAssignments} from '../other-classes/OutputAssignments';
import {SignalAssignments} from '../other-classes/SignalAssignments';
import {Transition} from '../other-classes/Transition';
import {CollabState} from '../other-classes/collabState';
import {Inputs} from '../other-classes/Inputs';
import {Outputs} from '../other-classes/Outputs';
import {Signals} from '../other-classes/Signals';
import {Parameters} from '../other-classes/Parameters';
import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {VerilogLexer} from './verilog/ANTLR/VerilogLexer';
import {
  Always_constructContext,
  Blocking_assignmentContext,
  Case_itemContext,
  Case_statementContext,
  Conditional_statementContext,
  ExpressionContext,
  Input_declarationContext,
  List_of_param_assignmentsContext,
  List_of_port_declarationsContext,
  Local_parameter_declarationContext,
  Msb_constant_expressionContext,
  Nonblocking_assignmentContext,
  Output_declarationContext,
  Param_assignmentContext,
  Parameter_declarationContext,
  Port_identifierContext,
  Range_Context,
  Reg_declarationContext,
  Seq_blockContext,
  Variable_typeContext,
  VerilogParser
} from './verilog/ANTLR/VerilogParser';


@Component({
  selector: 'app-generate-diagram-from-verilog',
  template: ``
})

export class GenerateDiagramFromVerilogComponent {

  private parsedCode: GenerateDiagramSchema;
  private parseTree: any;

  public searchTreeAllNodes(treeNode: any, matchingObject: any, results: any): any {
    // if we did not get array, create empty
    if (Object.prototype.toString.call(results) !== '[object Array]') {
      results = [];
    }
    // if matching object found, push to result array
    if (treeNode instanceof matchingObject) {
      results.push(treeNode);
    } else if (treeNode?.children != null) {
      let i: number;
      // if node has children, for each search for object
      for (i = 0; i < treeNode.children.length; i++) {
        this.searchTreeAllNodes(treeNode.children[i], matchingObject, results);
      }
    }
    // return results
    return results;
  }

  public generateDiagramData(fileContent: string): GenerateDiagramSchema {
    const inputStream: ANTLRInputStream = new ANTLRInputStream(fileContent);
    const lexer: VerilogLexer = new VerilogLexer(inputStream);
    const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
    const parser: VerilogParser = new VerilogParser(tokenStream);
    this.parseTree = parser.source_text();
    this.processVerilogParseTree();
    return this.parsedCode;
  }

  private initParsedCode(): void {
    this.parsedCode = new GenerateDiagramSchema();
    this.parsedCode.machineType = '';
    this.parsedCode.language = 'SystemVerilog';
    this.parsedCode.inputs = [];
    this.parsedCode.outputs = [];
    this.parsedCode.signals = [];
    this.parsedCode.parameters = [];
    this.parsedCode.states = [];
    this.parsedCode.transitions = [];
  }

  private processVerilogParseTree(): void {
    this.initParsedCode();
    // input and output interfaces
    const listOfPortDeclarations: any =
      this.searchTreeAllNodes(this.parseTree, List_of_port_declarationsContext, null);
    this.parseAllInputsAndOutputs(listOfPortDeclarations);
    // states as localparam
    const listParams: any =
      this.searchTreeAllNodes(this.parseTree, Local_parameter_declarationContext, null);
    this.parseStates(listParams);
    // internal signals
    const dataDeclaration: any =
      this.searchTreeAllNodes(this.parseTree, Reg_declarationContext, null);
    this.parseInternalSignals(dataDeclaration);
    // parameters
    const listOfParameterDeclarations: any =
      this.searchTreeAllNodes(this.parseTree, Parameter_declarationContext, null);
    this.parseParameters(listOfParameterDeclarations);
    // always_blocks
    this.createAssignmentsForStates();
    const alwaysConstructions: any =
      this.searchTreeAllNodes(this.parseTree, Always_constructContext, null);
    if (alwaysConstructions.length === 1) {
      this.parsedCode.machineType = 'Mealy';
      this.parseAlwaysBlocks(alwaysConstructions);
    } else {
      this.parseAlwaysBlocks(alwaysConstructions);
    }
  }

  private createAssignmentsForStates(): void {
    for (const state of this.parsedCode.states) {
      state.outputs = this.createOutputAssignments();
      state.signals = this.createSignalAssignments();
    }
  }

  private createOutputAssignments(): OutputAssignments[] {
    const outputAssignments: OutputAssignments[] = [];
    for (const output of this.parsedCode.outputs) {
      const outputAssignment: OutputAssignments = {
        name: output.name,
        bits: output.bits,
        type: 'Binary',
        value: ''
      };
      outputAssignments.push(outputAssignment);
    }
    return outputAssignments;
  }

  private createSignalAssignments(): SignalAssignments[] {
    const signalAssignments: SignalAssignments[] = [];
    for (const signal of this.parsedCode.signals) {
      const signalAssignment: SignalAssignments = {
        name: signal.name,
        bits: signal.bits,
        type: 'Binary',
        value: ''
      };
      signalAssignments.push(signalAssignment);
    }
    return signalAssignments;
  }

  private parseInitialState(conditionalStatement: any[]): void {
    let initialStateName: string = '';
    if (conditionalStatement.length === 0) {
      return;
    }
    const expression: any =
      this.searchTreeAllNodes(conditionalStatement[0], ExpressionContext, null);
    if (String(expression[0]?.text) === '!rst') {
      const sequentialBlocks: any =
        this.searchTreeAllNodes(conditionalStatement[0], Seq_blockContext, null);
      const nonBlockingAssignments: any =
        this.searchTreeAllNodes(sequentialBlocks[0], Nonblocking_assignmentContext, null);
      for (const nonBlockingAssignment of nonBlockingAssignments) {
        if (String(nonBlockingAssignment.children[0].text) === 'current_state') {
          initialStateName = String(nonBlockingAssignment.children[2].text);
          break;
        }
      }
      for (const state of this.parsedCode.states) {
        if (state.name === initialStateName) {
          state.initial = true;
          break;
        }
      }
    } else {
      return;
    }
  }

  private createOrUpdateTransition(
    source: string,
    target: string,
    condition: string,
    outputAssignments: OutputAssignments[],
    signalAssignments: SignalAssignments[]
  ): void {
    if (target !== '' && (outputAssignments.length !== 0 || signalAssignments.length !== 0)) {
      this.parsedCode.machineType = 'Mealy';
      if (!this.transitionExists(source, target)) {
        const transition: Transition = {
          source,
          target,
          condition,
          id: '',
          outputs: outputAssignments,
          signals: signalAssignments,
          vertices: []
        };
        this.parsedCode.transitions.push(transition);
      }
    } else if (target !== '' && outputAssignments.length === 0 && signalAssignments.length === 0) {
      if (!this.transitionExists(source, target)) {
        const transition: Transition = {
          source,
          target,
          condition,
          id: '',
          outputs: outputAssignments,
          signals: signalAssignments,
          vertices: []
        };
        this.parsedCode.transitions.push(transition);
      }
    } else if (target === '' && (outputAssignments.length !== 0
      || signalAssignments.length !== 0)) {
      this.parsedCode.machineType = 'Mealy';
      if (!this.transitionExistsBasedOnSourceAndCondition(source, condition)) {
        const transition: Transition = {
          source,
          target,
          condition,
          id: '',
          outputs: outputAssignments,
          signals: signalAssignments,
          vertices: []
        };
        this.parsedCode.transitions.push(transition);
      } else {
        for (const transition of this.parsedCode.transitions) {
          if (transition.source === source && transition.condition === condition) {
            transition.outputs = outputAssignments;
            transition.signals = signalAssignments;
          }
        }
      }
    }
  }

  private transitionExists(source: string, target: string): boolean {
    for (const transition of this.parsedCode.transitions) {
      if (transition.source === source && transition.target === target) {
        return true;
      }
    }
    return false;
  }

  private transitionExistsBasedOnSourceAndCondition(source: string, condition: string): boolean {
    for (const transition of this.parsedCode.transitions) {
      if (transition.source === source && transition.condition === condition) {
        return true;
      }
    }
    return false;
  }

  private updateStateAssignments(
    stateName: string,
    outputAssignments: OutputAssignments[],
    signalAssignments: SignalAssignments[]
  ): void {
    for (const state of this.parsedCode.states) {
      if (state.name === stateName) {
        state.outputs = outputAssignments;
        state.signals = signalAssignments;
      }
    }
  }

  private decideAssignmentType(expression: string): string {
    const binaryFormat: RegExp = RegExp('^[0-9]+\'b[0-1]+$');
    const octalFormat: RegExp = RegExp('^[0-9]+\'o[0-7]+$');
    const decimalFormat: RegExp = RegExp('^[0-9]+\'d[0-9]+$');
    const hexadecimalFormat: RegExp = RegExp('^[0-9]+\'h[A-Fa-f0-9]+$');
    if (binaryFormat.test(expression)) {
      return 'Binary';
    } else if (octalFormat.test(expression)) {
      return 'Octal';
    } else if (decimalFormat.test(expression)) {
      return 'Decimal';
    } else if (hexadecimalFormat.test(expression)) {
      return 'Hexadecimal';
    } else {
      return 'Binary';
    }
  }

  private decideAssignmentValue(expression: string): string {
    const binaryFormat: RegExp = RegExp('^[0-9]+\'b[0-1]+$');
    const octalFormat: RegExp = RegExp('^[0-9]+\'o[0-7]+$');
    const decimalFormat: RegExp = RegExp('^[0-9]+\'d[0-9]+$');
    const hexadecimalFormat: RegExp = RegExp('^[0-9]+\'h[A-Fa-f0-9]+$');
    if (binaryFormat.test(expression)) {
      return expression.substring(expression.toLowerCase().indexOf('b') + 1);
    } else if (octalFormat.test(expression)) {
      return expression.substring(expression.toLowerCase().indexOf('o') + 1);
    } else if (decimalFormat.test(expression)) {
      return expression.substring(expression.toLowerCase().indexOf('d') + 1);
    } else if (hexadecimalFormat.test(expression)) {
      return expression.substring(expression.toLowerCase().indexOf('h') + 1);
    } else {
      return '';
    }
  }

  private parseCaseWithCondition(
    source: string,
    expressionCondition: any[],
    sequentialBlock: any[]
  ): void {
    let target: string = '';
    let condition: string = '';
    let sbi: number = -1;
    for (const item of expressionCondition) {
      if (item.parent.invokingState === 2860) {
        sbi = sbi + 1;
        condition = item.text;
        const nonBlockingAssignments: any =
          this.searchTreeAllNodes(sequentialBlock[sbi], Nonblocking_assignmentContext, null);
        const outputAssignments: OutputAssignments[] = this.createOutputAssignments();
        const signalAssignments: SignalAssignments[] = this.createSignalAssignments();
        if (nonBlockingAssignments.length !== 0) {
          for (const nonBlockingAssignment of nonBlockingAssignments) {
            const variableValue: string = String(nonBlockingAssignment.children[0].text);
            const expression: string = String(nonBlockingAssignment.children[2].text);
            if (variableValue === 'current_state' || variableValue === 'next_state') {
              target = expression;
            } else {
              const type: string = this.decideAssignmentType(expression);
              const value: string = this.decideAssignmentValue(expression);
              for (const outputAssignment of outputAssignments) {
                if (outputAssignment.name === variableValue) {
                  outputAssignment.type = type;
                  outputAssignment.value = value;
                }
              }
              for (const signalAssignment of signalAssignments) {
                if (signalAssignment.name === variableValue) {
                  signalAssignment.type = type;
                  signalAssignment.value = value;
                }
              }
            }
          }
          this.createOrUpdateTransition(
            source,
            target,
            condition,
            outputAssignments,
            signalAssignments
          );
        } else {
          const blockingAssignments: any =
            this.searchTreeAllNodes(sequentialBlock[sbi], Blocking_assignmentContext, null);
          for (const blockingAssignment of blockingAssignments) {
            const variableValue: string = String(blockingAssignment.children[0].text);
            const expression: string = String(blockingAssignment.children[2].text);
            if (variableValue === 'current_state' || variableValue === 'next_state') {
              target = expression;
            } else {
              const type: string = this.decideAssignmentType(expression);
              const value: string = this.decideAssignmentValue(expression);
              for (const outputAssignment of outputAssignments) {
                if (outputAssignment.name === variableValue) {
                  outputAssignment.type = type;
                  outputAssignment.value = value;
                }
              }
              for (const signalAssignment of signalAssignments) {
                if (signalAssignment.name === variableValue) {
                  signalAssignment.type = type;
                  signalAssignment.value = value;
                }
              }
            }
          }
          this.createOrUpdateTransition(
            source,
            target,
            condition,
            outputAssignments,
            signalAssignments
          );
        }
      }
    }
  }

  private parseCaseWithoutCondition(caseItem: any[]): void {
    this.parsedCode.machineType = 'Moore';
    let source: string;
    let target: string;
    const caseItemExpression: any = this.searchTreeAllNodes(caseItem, ExpressionContext, null);
    source = String(caseItemExpression[0].text);
    const sequentialBlock: any = this.searchTreeAllNodes(caseItem, Seq_blockContext, null);
    const nonBlockingAssignments: any =
      this.searchTreeAllNodes(sequentialBlock[0], Nonblocking_assignmentContext, null);
    if (nonBlockingAssignments.length !== 0) {
      const outputAssignments: OutputAssignments[] = this.createOutputAssignments();
      const signalAssignments: SignalAssignments[] = this.createSignalAssignments();
      for (const nonBlockingAssignment of nonBlockingAssignments) {
        const variableValue: string = String(nonBlockingAssignment.children[0].text);
        const expression: string = String(nonBlockingAssignment.children[2].text);
        if (variableValue === 'current_state' || variableValue === 'next_state') {
          target = expression;
        } else {
          const type: string = this.decideAssignmentType(expression);
          const value: string = this.decideAssignmentValue(expression);
          for (const outputAssignment of outputAssignments) {
            if (outputAssignment.name === variableValue) {
              outputAssignment.type = type;
              outputAssignment.value = value;
            }
          }
          for (const signalAssignment of signalAssignments) {
            if (signalAssignment.name === variableValue) {
              signalAssignment.type = type;
              signalAssignment.value = value;
            }
          }
        }
      }
      this.updateStateAssignments(source, outputAssignments, signalAssignments);
    } else {
      const outputAssignments: OutputAssignments[] = this.createOutputAssignments();
      const signalAssignments: SignalAssignments[] = this.createSignalAssignments();
      const blockingAssignments: any =
        this.searchTreeAllNodes(sequentialBlock[0], Blocking_assignmentContext, null);
      for (const blockingAssignment of blockingAssignments) {
        const variableValue: string = String(blockingAssignment.children[0].text);
        const expression: string = String(blockingAssignment.children[2].text);
        if (variableValue === 'current_state' || variableValue === 'next_state') {
          target = expression;
        } else {
          const type: string = this.decideAssignmentType(expression);
          const value: string = this.decideAssignmentValue(expression);
          for (const outputAssignment of outputAssignments) {
            if (outputAssignment.name === variableValue) {
              outputAssignment.type = type;
              outputAssignment.value = value;
            }
          }
          for (const signalAssignment of signalAssignments) {
            if (signalAssignment.name === variableValue) {
              signalAssignment.type = type;
              signalAssignment.value = value;
            }
          }
        }
      }
      this.updateStateAssignments(source, outputAssignments, signalAssignments);
    }
  }

  private parseAlwaysBlocks(alwaysConstructions: any[]): void {
    let sourceState: string = '';
    for (const alwaysConstruction of alwaysConstructions) {
      const conditionalStatement: any =
        this.searchTreeAllNodes(alwaysConstruction, Conditional_statementContext, null);
      this.parseInitialState(conditionalStatement);
      const caseStatement: any =
        this.searchTreeAllNodes(alwaysConstruction, Case_statementContext, null);
      const caseItems: any =
        this.searchTreeAllNodes(caseStatement[0], Case_itemContext, null);
      for (const caseItem of caseItems) {
        const expression: any =
          this.searchTreeAllNodes(caseItem, ExpressionContext, null);
        sourceState = String(expression[0].text);
        const conditionStatement: any =
          this.searchTreeAllNodes(caseItem, Conditional_statementContext, null);
        const expressionCondition: any =
          this.searchTreeAllNodes(conditionStatement[0], ExpressionContext, null);
        const sequentialBlock: any =
          this.searchTreeAllNodes(conditionStatement[0], Seq_blockContext, null);
        if (expressionCondition.length !== 0) {
          this.parseCaseWithCondition(sourceState, expressionCondition, sequentialBlock);
        } else {
          this.parseCaseWithoutCondition(caseItem);
        }
      }
    }
  }

  private parseParameters(listOfParameterDeclarations: any[]): void {
    const listOfParamAssignment: any =
      this.searchTreeAllNodes(
        listOfParameterDeclarations[0],
        List_of_param_assignmentsContext,
        null
      );
    const parameterAssignments: any =
      this.searchTreeAllNodes(listOfParamAssignment[0], Param_assignmentContext, null);
    for (const parameterAssignment of parameterAssignments) {
      this.createNewParameter(
        parameterAssignment.children[0].text,
        'Integer',
        parameterAssignment.children[2].text
      );
    }
  }

  private parseInternalSignals(regDeclarations: any[]): void {
    for (const regDeclaration of regDeclarations) {
      if (regDeclaration.childCount === 3) {
        const bits: string = '1';
        const listOfVariableTypes: any =
          this.searchTreeAllNodes(regDeclaration, Variable_typeContext, null);
        for (const variable of listOfVariableTypes) {
          this.createNewInternalSignal(variable.text, bits);
        }
      } else {
        const range: any = this.searchTreeAllNodes(regDeclaration, Range_Context, null);
        const bits: string = String(Number(
          this.searchTreeAllNodes(range[0], Msb_constant_expressionContext, null)[0].text) + 1);
        const listOfVariableTypes: any =
          this.searchTreeAllNodes(regDeclaration, Variable_typeContext, null);
        for (const variable of listOfVariableTypes) {
          this.createNewInternalSignal(variable.text, bits);
        }
      }
    }
  }

  private parseStates(paramList: any[]): void {
    const localParamAssignments: any =
      this.searchTreeAllNodes(paramList[0], List_of_param_assignmentsContext, null);
    const paramAssignments: any =
      this.searchTreeAllNodes(localParamAssignments[0], Param_assignmentContext, null);
    for (const paramAssignment of paramAssignments) {
      this.createNewState(paramAssignment.children[0].text);
    }
  }

  private parseAllInputsAndOutputs(listOfPortDeclarations: any[]): void {
    const inputDeclarations: any =
      this.searchTreeAllNodes(listOfPortDeclarations[0], Input_declarationContext, null);
    const outputDeclarations: any =
      this.searchTreeAllNodes(listOfPortDeclarations[0], Output_declarationContext, null);
    for (const inputDeclaration of inputDeclarations) {
      const portIdentifier: any =
        this.searchTreeAllNodes(inputDeclaration, Port_identifierContext, null);
      const range: any = this.searchTreeAllNodes(inputDeclaration, Range_Context, null);
      if (range.length === 0) {
        this.createNewInput(String(portIdentifier[0].text), '1');
      } else {
        const constantExpression: any =
          this.searchTreeAllNodes(range[0], Msb_constant_expressionContext, null);
        this.createNewInput(String(portIdentifier[0].text),
          String(Number(constantExpression[0].text) + 1));
      }
    }
    for (const outputDeclaration of outputDeclarations) {
      const portIdentifier: any =
        this.searchTreeAllNodes(outputDeclaration, Port_identifierContext, null);
      const range: any =
        this.searchTreeAllNodes(outputDeclaration, Range_Context, null);
      if (range.length === 0) {
        this.createNewOutput(String(portIdentifier[0].text), '1');
      } else {
        const constantExpression: any =
          this.searchTreeAllNodes(range[0], Msb_constant_expressionContext, null);
        this.createNewOutput(String(portIdentifier[0].text),
          String(Number(constantExpression[0].text) + 1));
      }
    }
  }

  private createNewState(name: string): void {
    if (name !== '') {
      const state: CollabState = {
        name,
        initial: false,
        id: '',
        outputs: [],
        signals: [],
        position: {x: 0, y: 0}
      };
      this.parsedCode.states.push(state);
    }
  }

  private createNewInput(name: string, bits: string): void {
    if (name !== 'clk' && name !== 'rst') {
      const input: Inputs = {
        name,
        bits
      };
      this.parsedCode.inputs.push(input);
    }
  }

  private createNewOutput(name: string, bits: string): void {
    if (name !== 'clk' && name !== 'rst') {
      const output: Outputs = {
        name,
        bits
      };
      this.parsedCode.outputs.push(output);
    }
  }

  private createNewInternalSignal(name: string, bits: string): void {
    if (name !== 'current_state' && name !== 'next_state') {
      const signal: Signals = {
        name,
        bits
      };
      this.parsedCode.signals.push(signal);
    }
  }

  private createNewParameter(name: string, type: string, value: string): void {
    const parameter: Parameters = {
      name,
      type,
      value
    };
    this.parsedCode.parameters.push(parameter);
  }

}
