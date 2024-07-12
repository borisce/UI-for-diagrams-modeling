import {Component} from '@angular/core';
import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {
  Architecture_bodyContext,
  Architecture_declarative_partContext,
  Case_statement_alternativeContext,
  Case_statementContext,
  ChoiceContext,
  ConditionContext,
  Enumeration_literalContext,
  Explicit_rangeContext,
  Identifier_listContext,
  IdentifierContext,
  If_statementContext,
  Interface_port_declarationContext,
  Interface_port_listContext,
  Process_statementContext,
  Sequence_of_statementsContext,
  Signal_assignment_statementContext,
  Signal_declarationContext,
  TargetContext,
  Type_declarationContext,
  vhdlParser,
  WaveformContext
} from '../../visualization/components/diagram-generation/vhdl/ANTLR/vhdlParser';
import {vhdlLexer} from '../../visualization/components/diagram-generation/vhdl/ANTLR/vhdlLexer';
import {GenerateDiagramSchema} from '../other-classes/GenerateDiagramSchema';
import {Inputs} from '../other-classes/Inputs';
import {Outputs} from '../other-classes/Outputs';
import {CollabState} from '../other-classes/collabState';
import {Signals} from '../other-classes/Signals';
import {OutputAssignments} from '../other-classes/OutputAssignments';
import {SignalAssignments} from '../other-classes/SignalAssignments';
import {Transition} from '../other-classes/Transition';


@Component({
  selector: 'app-generate-diagram-from-vhdl',
  template: ``
})

export class GenerateDiagramFromVhdlComponent {

  private vhdlParseTree: any;
  private parsedCode: GenerateDiagramSchema;

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
    const lexer: vhdlLexer = new vhdlLexer(inputStream);
    const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
    const parser: vhdlParser = new vhdlParser(tokenStream);
    this.vhdlParseTree = parser.design_file();
    this.initParsingCode();
    return this.parsedCode;
  }

  private initParsedCode(): void {
    this.parsedCode = new GenerateDiagramSchema();
    this.parsedCode.machineType = '';
    this.parsedCode.language = 'VHDL';
    this.parsedCode.inputs = [];
    this.parsedCode.outputs = [];
    this.parsedCode.signals = [];
    this.parsedCode.parameters = [];
    this.parsedCode.states = [];
    this.parsedCode.transitions = [];
  }

  private initParsingCode(): void {
    this.initParsedCode();
    this.parsedCode.machineType = 'Mealy';
    // parse ports
    const portList: any =
      this.searchTreeAllNodes(this.vhdlParseTree, Interface_port_listContext, null);
    this.parsePorts(portList);
    const architectureBody: any =
      this.searchTreeAllNodes(this.vhdlParseTree, Architecture_bodyContext, null);
    const architectureDeclarativePart: any
      = this.searchTreeAllNodes(architectureBody[0], Architecture_declarative_partContext, null);
    // parse internal signals
    this.parseInternalSignals(architectureDeclarativePart);
    // parse states
    this.parseStates(architectureDeclarativePart);
    this.createAssignmentsForStates();
    // parse processes
    const processStatements: any =
      this.searchTreeAllNodes(architectureBody[0], Process_statementContext, null);
    this.parseProcesses(processStatements);
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

  private createNewInput(name: string, bits: string): void {
    if (name !== 'clk' && name !== 'rst' && name !== 'reset') {
      const input: Inputs = {
        name,
        bits
      };
      this.parsedCode.inputs.push(input);
    }
  }

  private createNewOutput(name: string, bits: string): void {
    if (name !== 'clk' && name !== 'rst' && name !== 'reset') {
      const output: Outputs = {
        name,
        bits
      };
      this.parsedCode.outputs.push(output);
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

  private createNewInternalSignal(name: string, bits: string): void {
    if (name !== 'current_state' && name !== 'next_state' && name !== 'state' && name !== 'state_type') {
      const signal: Signals = {
        name,
        bits
      };
      this.parsedCode.signals.push(signal);
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
          condition: condition.substring(1, condition.length - 1),
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
          condition: condition.substring(1, condition.length - 1),
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
      if (this.transitionExistsBasedOnSourceAndCondition(
        source,
        condition.substring(1, condition.length - 1).toString())) {
        for (const transition of this.parsedCode.transitions) {
          if (transition.source === source &&
            transition.condition.toString() ===
            condition.substring(1, condition.length - 1).toString()) {
            transition.outputs = outputAssignments;
            transition.signals = signalAssignments;
            break;
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

  private parseInitialState(ifStatement: any[]): void {
    let initialStateName: string = '';
    if (ifStatement.length === 0) {
      return;
    }
    const condition: any = this.searchTreeAllNodes(ifStatement[0], ConditionContext, null);
    if (String(condition[0]?.text) === '(reset=\'1\')') {
      const sequenceOfStatements: any =
        this.searchTreeAllNodes(ifStatement[0], Sequence_of_statementsContext, null);
      const signalAssignments: any =
        this.searchTreeAllNodes(sequenceOfStatements[0], Signal_assignment_statementContext, null);
      for (const signalAssignment of signalAssignments) {
        const target: any = this.searchTreeAllNodes(signalAssignment, TargetContext, null);
        const waveform: any = this.searchTreeAllNodes(signalAssignment, WaveformContext, null);
        if (String(target[0].text) === 'current_state') {
          initialStateName = String(waveform[0].text);
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

  private decideAssignmentType(expression: string): string {
    const binaryFormat: RegExp = RegExp('^[bB]?\"[0-1]+\"$');
    const octalFormat: RegExp = RegExp('^[oO]\"[0-7]+\"$');
    const hexadecimalFormat: RegExp = RegExp('^[xX]\"[A-Za-z0-9]+\"$');
    if (binaryFormat.test(expression)) {
      return 'Binary';
    } else if (octalFormat.test(expression)) {
      return 'Octal';
    } else if (hexadecimalFormat.test(expression)) {
      return 'Hexadecimal';
    } else {
      return 'Binary';
    }
  }

  private decideAssignmentValue(expression: string): string {
    const binaryFormat: RegExp = RegExp('^[bB]?\"[0-1]+\"$');
    const octalFormat: RegExp = RegExp('^[oO]\"[0-7]+\"$');
    const hexadecimalFormat: RegExp = RegExp('^[xX]\"[A-Za-z0-9]+\"$');
    if (binaryFormat.test(expression)) {
      return expression.substring(expression.toLowerCase().indexOf('b') + 1).replace(/"/g, '');
    } else if (octalFormat.test(expression)) {
      return expression.substring(expression.toLowerCase().indexOf('o') + 1).replace(/"/g, '');
    } else if (hexadecimalFormat.test(expression)) {
      return expression.substring(expression.toLowerCase().indexOf('x') + 1).replace(/"/g, '');
    } else {
      return '';
    }
  }

  private parseCaseWithCondition(
    source: string,
    conditions: any[],
    sequenceOfStatements: any[]
  ): void {
    let target: string = '';
    let condition: string = '';
    for (let i: number = 0; i < conditions.length; i++) {
      condition = String(conditions[i].text);
      const signalAssignmentStatements: any =
        this.searchTreeAllNodes(sequenceOfStatements[i], Signal_assignment_statementContext, null);
      const outputAssignments: OutputAssignments[] = this.createOutputAssignments();
      const signalAssignments: SignalAssignments[] = this.createSignalAssignments();
      for (const signalAssignmentStatement of signalAssignmentStatements) {
        const targetAssignment: any =
          this.searchTreeAllNodes(signalAssignmentStatement, TargetContext, null);
        const waveform: any =
          this.searchTreeAllNodes(signalAssignmentStatement, WaveformContext, null);
        const targetValue: string = String(targetAssignment[0].text);
        const assignValue: string = String(waveform[0].text);
        if (targetValue === 'current_state' || targetValue === 'next_state') {
          target = assignValue;
        } else {
          const type: string = this.decideAssignmentType(assignValue);
          const value: string = this.decideAssignmentValue(assignValue);
          for (const outputAssignment of outputAssignments) {
            if (outputAssignment.name === targetValue) {
              outputAssignment.type = type;
              outputAssignment.value = value;
            }
          }
          for (const signalAssignment of signalAssignments) {
            if (signalAssignment.name === targetValue) {
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

  private parseCaseWithoutCondition(caseStatementAlternative: any[]): void {
    this.parsedCode.machineType = 'Moore';
    let source: string;
    let target: string;
    const choice: any = this.searchTreeAllNodes(caseStatementAlternative, ChoiceContext, null);
    source = String(choice[0].text);
    const sequenceOfStatements: any =
      this.searchTreeAllNodes(caseStatementAlternative, Sequence_of_statementsContext, null);
    const signalAssignmentsStatements: any =
      this.searchTreeAllNodes(sequenceOfStatements[0], Signal_assignment_statementContext, null);
    const outputAssignments: OutputAssignments[] = this.createOutputAssignments();
    const signalAssignments: SignalAssignments[] = this.createSignalAssignments();
    for (const signalAssignmentStatement of signalAssignmentsStatements) {
      const targetAssignment: any =
        this.searchTreeAllNodes(signalAssignmentStatement, TargetContext, null);
      const waveform: any =
        this.searchTreeAllNodes(signalAssignmentStatement, WaveformContext, null);
      const targetValue: string = String(targetAssignment[0].text);
      const assignValue: string = String(waveform[0].text);
      if (targetValue === 'current_state' || targetValue === 'next_state') {
        target = assignValue;
      } else {
        const type: string = this.decideAssignmentType(assignValue);
        const value: string = this.decideAssignmentValue(assignValue);
        for (const outputAssignment of outputAssignments) {
          if (outputAssignment.name === targetValue) {
            outputAssignment.type = type;
            outputAssignment.value = value;
          }
        }
        for (const signalAssignment of signalAssignments) {
          if (signalAssignment.name === targetValue) {
            signalAssignment.type = type;
            signalAssignment.value = value;
          }
        }
      }
    }
    this.updateStateAssignments(source, outputAssignments, signalAssignments);
  }

  private parseProcesses(processStatements: any[]): void {
    let sourceState: string = '';
    for (const processStatement of processStatements) {
      const ifStatement: any = this.searchTreeAllNodes(processStatement, If_statementContext, null);
      this.parseInitialState(ifStatement);
      const caseStatement: any =
        this.searchTreeAllNodes(processStatement, Case_statementContext, null);
      const caseStatementAlternatives: any =
        this.searchTreeAllNodes(caseStatement[0], Case_statement_alternativeContext, null);
      for (const caseStatementAlternative of caseStatementAlternatives) {
        const choice: any = this.searchTreeAllNodes(caseStatementAlternative, ChoiceContext, null);
        sourceState = String(choice[0].text);
        if (sourceState !== 'others') {
          const statement: any =
            this.searchTreeAllNodes(caseStatementAlternative, If_statementContext, null);
          const condition: any = this.searchTreeAllNodes(statement[0], ConditionContext, null);
          const sequenceOfStatements: any =
            this.searchTreeAllNodes(statement[0], Sequence_of_statementsContext, null);
          if (condition.length !== 0) {
            this.parseCaseWithCondition(sourceState, condition, sequenceOfStatements);
          } else {
            this.parseCaseWithoutCondition(caseStatementAlternative);
          }
        }
      }
    }
  }

  private parseInternalSignals(architectureDeclarations: any[]): void {
    for (const architectureDeclaration of architectureDeclarations) {
      const signalDeclarations: any =
        this.searchTreeAllNodes(architectureDeclaration, Signal_declarationContext, null);
      for (const signalDeclaration of signalDeclarations) {
        const identifierList: any =
          this.searchTreeAllNodes(signalDeclaration, Identifier_listContext, null);
        const identifiers: any =
          this.searchTreeAllNodes(identifierList[0], IdentifierContext, null);
        for (const identifier of identifiers) {
          const explicitRange: any =
            this.searchTreeAllNodes(signalDeclaration, Explicit_rangeContext, null);
          if (explicitRange.length === 0) {
            this.createNewInternalSignal(String(identifier.text), '1');
          } else {
            this.createNewInternalSignal(String(identifier.text),
              String(Number(explicitRange[0].children[0].text) + 1));
          }
        }
      }
    }
  }

  private parseStates(architectureDeclarations: any[]): void {
    for (const architectureDeclaration of architectureDeclarations) {
      const typeDeclaration: any =
        this.searchTreeAllNodes(architectureDeclaration, Type_declarationContext, null);
      if (String(typeDeclaration[0].children[1].text) === 'state_type') {
        const enumerationLiterals: any =
          this.searchTreeAllNodes(typeDeclaration[0], Enumeration_literalContext, null);
        for (const enumerationLiteral of enumerationLiterals) {
          const name: string = String(enumerationLiteral.text);
          this.createNewState(name);
        }
      }
    }
  }

  private parsePorts(portLists: any[]): void {
    for (const portList of portLists) {
      const portDeclarations: any =
        this.searchTreeAllNodes(portList, Interface_port_declarationContext, null);
      for (const portDeclaration of portDeclarations) {
        const range: any = this.searchTreeAllNodes(portDeclaration, Explicit_rangeContext, null);
        if (range.length === 0) {
          const name: string = String(portDeclaration.children[0].text);
          const signalMode: string = String(portDeclaration.children[2]?.text);
          if (signalMode === 'in') {
            this.createNewInput(name, '1');
          } else if (signalMode === 'out') {
            this.createNewOutput(name, '1');
          }
        } else {
          const name: string = String(portDeclaration.children[0].text);
          const signalMode: string = String(portDeclaration.children[2].text);
          if (signalMode === 'in') {
            const bits: string = String(Number(range[0].children[0].text) + 1);
            this.createNewInput(name, bits);
          } else if (signalMode === 'out') {
            const bits: string = String(Number(range[0].children[0].text) + 1);
            this.createNewOutput(name, bits);
          }
        }
      }
    }
  }

}
