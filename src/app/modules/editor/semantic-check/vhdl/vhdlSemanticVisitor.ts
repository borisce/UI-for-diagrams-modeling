import { vhdlVisitor } from '../../vhdl/syntax-check/ANTLR/vhdlVisitor';
import {
  Architecture_statementContext,
  Architecture_statement_partContext,
  Case_statementContext,
  ConditionContext,
  If_statementContext,
  Process_statementContext,
  Process_statement_partContext,
  Sensitivity_listContext,
  Sequential_statementContext,
  Signal_declarationContext
} from '../../vhdl/syntax-check/ANTLR/vhdlParser'; // Import the specific context type
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { references } from '../../vhdl/syntax-check/syntaxChecker';
import { codeLines } from '../../vhdl/syntax-check/syntaxChecker';
import {
  endingWordColumn,
  getNumberOfConditions,
  getReferenceBitSize,
  isReferenceInString,
  isStatementComment,
  returnAssignmentStatementVariables,
  returnIfStatementVariables,
  sliceStringBeforeWord,
  startingWordColumn
} from '../syntaxUtils';
import { Marker, MarkerSeverity } from '../interfaces/Marker';
import { CodeBlockType, ObjectType, Reference } from '../interfaces/reference';
import { ParserRuleContext } from 'antlr4ts';

export let semanticMarkers: Array<Marker> = [];
export let semanticQuickfixes: Array<object> = [];

export class VHDLSemanticVisitor implements vhdlVisitor<void> {

  constructor(
    architectureProcessStatementPartContext: Process_statement_partContext[],
    architectureStatementPartContext: Architecture_statement_partContext,
    decisionContexts: Array<Case_statementContext | If_statementContext>
  ) {
    this.beginSemanticAnalysisVHDL(
      architectureProcessStatementPartContext,
      architectureStatementPartContext,
      decisionContexts);
  };

/* istanbul ignore next */
  beginSemanticAnalysisVHDL(
    architectureProcessStatementPartContext: Process_statement_partContext[],
    architectureStatementPartContext: Architecture_statement_partContext,
    decisionContexts: Array<Case_statementContext | If_statementContext>
  ) {
    if (architectureProcessStatementPartContext.length) {
      architectureProcessStatementPartContext.forEach((context) => {
        checkForIncompleteSensitivityList(context);
        checkForDuplicateImports(context);
        this.visitProcess_statement_part(context);
      });
  
      checkForRaceConditions(architectureProcessStatementPartContext);
    } else {
      this.visitArchitecture_statement_part(architectureStatementPartContext);
    }
  
    if (decisionContexts.length) {
      decisionContexts.forEach((context) => {
        this.checkForIncompleteDecisionStatements(context);
      });
    }
  }

  checkForIncompleteDecisionStatements(context: Case_statementContext | If_statementContext) {
    const constructorName = context.constructor.name;
  
    if (constructorName === 'Case_statementContext') {
      const [caseContexts, caseAlternatives] = this.visitCase_statement(context as unknown as Case_statementContext);
      checkForIncompleteCaseStatement(caseContexts, caseAlternatives);
    } else if (constructorName === 'If_statementContext') {
      const ifContexts = this.visitIf_statement(context as unknown as If_statementContext);
      checkForIncompleteIfStatement(ifContexts);
    }
  }

  /* istanbul ignore next */
  visitArchitecture_statement(context: Architecture_statementContext) {
    const contextType = context.constructor.name;

    if (contextType === 'If_statementContext') {
      this.visitIf_statement(context as unknown as If_statementContext);
    }
  };

  visitArchitecture_statement_part(context: Architecture_statement_partContext) {
    if (!context?.children || context?.childCount === 0) {
      return;
    }

    const children = context?.children;

    children.forEach((child) => {
      this.visitArchitecture_statement(child as Architecture_statementContext);
    });
  };

  visitCondition (ctx: ConditionContext) {
    checkForMultipleClocks(ctx);
  };
  
  visitIf_statement(context: If_statementContext) {
    this.checkForIfStatementTypeMismatch(context);

    context.children.forEach((child) => {
      const childType = child.constructor.name;

      if (childType === 'ConditionContext') {
        this.visitCondition(child as ConditionContext);
      }
    });
    
    return context.children;
  };

  visitCase_statement(ctx: Case_statementContext) {
    const children = ctx.children;
    const caseContexts = children.filter((child) => child.constructor.name !== 'Case_statement_alternativeContext');
    const caseAlternatives = children.filter((child) => child.constructor.name === 'Case_statement_alternativeContext');

    return [caseContexts, caseAlternatives];
  }

  visitProcess_statement(context: Process_statementContext) {
    if (context?.children === null || context?.childCount === 0) {
      return;
    }

    context?.children.forEach((child) => {
      this.visitSequential_statement(child as Sequential_statementContext);
    });
  };

  visitProcess_statement_part(context: Process_statement_partContext) {
    if (context.childCount === 0) {
      return;
    }

    context.children.forEach((child) => {
      this.visitProcess_statement(child as Process_statementContext);
    });
  };
  
  visitSequential_statement(context: Sequential_statementContext) {
    const contextType = context.constructor.name;

    if (contextType === 'If_statementContext') {
      this.visitIf_statement(context as unknown as If_statementContext);
    }
  };

  /* istanbul ignore next */
  visit(tree: ParseTree): void {
    console.log('Method not implemented.', tree);
  }
  /* istanbul ignore next */
  visitChildren(node: RuleNode): void {
    console.log('Method not implemented.', node);
  }
  /* istanbul ignore next */
  visitTerminal(node: TerminalNode): void {
    console.log('Method not implemented.', node);
  }
  /* istanbul ignore next */
  visitErrorNode(node: ErrorNode): void {
    console.log('Method not implemented.', node);
  }
  /* istanbul ignore next */
  visitSignal_declaration(context: Signal_declarationContext): void {
    console.log('Method not implemented.', context);
  }

  checkForIfStatementTypeMismatch(context: If_statementContext) {
    const occurenceLine = context.start.line - 1;

    if (!codeLines[occurenceLine].includes('if')) {
      return;
    }
  
    let text = sliceStringBeforeWord(codeLines[occurenceLine], 'then');
    text = sliceStringBeforeWord(text, 'elsif');
    text = sliceStringBeforeWord(text, 'else');

    text = text.replace('if', '');
    text = text.toLocaleLowerCase();

    if (!text.includes(' = ') && !text.includes('=')) {
      return;
    }

    let statementVariables = [];

    references.forEach((value: object, key: string) => {
      if (isReferenceInString(text, key)) {
        statementVariables.push(value);
      }
    });

    if (statementVariables.length !== 2) {
      return;
    }

    const startLine = occurenceLine + 1;
    const firstVariable = statementVariables[0];
    const secondVariable = statementVariables[1];

    if (firstVariable['dataType'] === secondVariable['dataType']) {
      return;
    }

    const markerMessage = `Semantic error: type mismatch between ${firstVariable['name']} and ${secondVariable['name']}`;
    const markerAlreadyExists = semanticMarkers.some((marker) => marker.message === markerMessage);
  
    if (markerAlreadyExists) {
      return;
    }

    semanticMarkers.push(new Marker(
      startLine,
      startingWordColumn(codeLines[occurenceLine], firstVariable['name']),
      startLine,
      endingWordColumn(codeLines[occurenceLine], secondVariable['name']),
      markerMessage,
      MarkerSeverity.Error
    ));
  }
}

function getProcessSensitivityListVariables(sensitivityListParseTree: ParserRuleContext[], processLineNumber: number) {
  let sensitivityListLineNumber = 0;
  let sensitivityListVariables = [];
  
  sensitivityListParseTree.forEach((child) => {
    if (child instanceof Sensitivity_listContext) {
      sensitivityListVariables = child.text.split(',');
      sensitivityListLineNumber = child.start.line;
    }
  });

  if (sensitivityListVariables.length === 0) {
    sensitivityListLineNumber = processLineNumber;
  }
  
  return [sensitivityListVariables, sensitivityListLineNumber];
}

function setAllProcessReferences(startLine: number, endLine: number, processReference: Reference) {
  const lines = codeLines.slice(startLine, endLine);
  const signals = new Array<string>();

  references.forEach((value: object, key: string) => {
    if (value['objectType'] === ObjectType.SIGNAL ||
        value['objectType'] === ObjectType.PORT_IN ||
        value['objectType'] === ObjectType.PORT_OUT) {
      signals.push(key);
    }
  });

  lines.forEach((line) => {
    signals.forEach((signal) => {
      if (isReferenceInString(line, signal) && !isStatementComment(line)) {
        line = line.replace(/^\s+/, '');
        const regex = /.*<=.*/;

        if (regex.test(line)) {
          const assignmentVariables = returnAssignmentStatementVariables(line);
          const leftVariable = assignmentVariables[0];
          const rightVariable = assignmentVariables[1]?.replace(';', '');

          if (leftVariable === signal) {
            if (!processReference['variablesWrite'].includes(signal)) {
              processReference['variablesWrite'].push(signal);
            }
          }
          
          if (rightVariable === signal) {
            if (!processReference['variablesRead'].includes(signal)) {
              processReference['variablesRead'].push(signal);
            }
          }
        } else {
          if (!processReference['variablesRead'].includes(signal)) {
            processReference['variablesRead'].push(signal);
          }
        }

      }
    });
  });
}

export function checkForRaceConditions(architectureProcessStatementPartContexts: Process_statement_partContext[]) {
  // how to find race conditions:
  // 1. check all sensitivity lists of all processes
  // 2. find if there is specific variable in more than one sensitivity list (process A and process B)
  // 3. check if one of those processes (process A or process B) change signal that triggers another (process C)
  // 4. check process C and save all signals that are used for reading (and writing)
  // 5. check process B if it writes to any of those signals
  const processes = Array
    .from(references.values())
    .filter((reference) => reference['codeBlockType'] === CodeBlockType.PROCESS);
  // Assuming each process has a 'sensitivityList' property
  const sensitivityLists = processes.map(process => process.sensitivityListVariables);

  // Flatten the array if each sensitivityList is an array
  const flattenedSensitivityLists = [].concat(...sensitivityLists);

  // Construct an array of duplicate variables
  const duplicateVariables = flattenedSensitivityLists.filter((item, index, array) => array.indexOf(item) !== index);

  // get all processes with any duplicate variable their sensitivity list - racingProcesses
  const processesWithDuplicate = processes.filter((process) => process.sensitivityListVariables.some((variable) => duplicateVariables.includes(variable)));

  // get all processes other than the ones with duplicate variables - childProcesses
  const processesWithoutDuplicate = processes.filter((process) => !process.sensitivityListVariables.some((variable) => duplicateVariables.includes(variable)));

  processesWithoutDuplicate.forEach((process) => {
    process.variablesRead.forEach((variable) => {
      if (processesWithDuplicate.some((processWithDuplicate) =>
        processWithDuplicate.variablesWrite.includes(variable))) {
          // is raceingProcess writing inro variable that childProcess is reading?
          // if so, add variable to potentialRaceConditionVariables
          if (!process.potentialRaceConditionVariables.includes(variable)) {
            process.potentialRaceConditionVariables.push(variable);
          }
      }
    });
  });

  processesWithoutDuplicate.forEach((process) => {
    architectureProcessStatementPartContexts.forEach((context) => {
      if (context.parent.start.line === process.line) {
        let startLine: number = context.parent.start.line;
        const endLine: number = context.parent.stop.line;
        const processStatements: string[] = codeLines.slice(startLine, endLine);

        processStatements.forEach((statement) => {
          startLine++;
          const unparsedLine = codeLines[startLine - 1];

          process.potentialRaceConditionVariables.forEach((variable) => {
            if (isReferenceInString(statement, variable)) {
              const message = `Semantic error: Race condition for ${variable}`;
              const markerAlreadyExists = semanticMarkers.some((marker) => marker.message === message && marker.startLineNumber === startLine - 1);

              if (markerAlreadyExists) {
                return;
              }

              semanticMarkers.push(new Marker(
                startLine,
                startingWordColumn(unparsedLine, variable),
                startLine,
                endingWordColumn(unparsedLine, variable),
                message,
                MarkerSeverity.Error
              ));
            }
          });
        });
      }
    });
  });
}

export function checkForIncompleteSensitivityList(context: Process_statement_partContext) {
  const signals = new Array<string>();
  const clocks = ['clock', 'clk', 'clken', 'clocks', 'clks', 'clocked', 'clocking'];
  const resets = ['reset', 'rst', 'reset', 'rsts', 'reseted', 'reseting'];

  references.forEach((value: Reference, key: string) => {
    if ((value['objectType'] === ObjectType.PORT_IN ||
        value['objectType'] === ObjectType.PORT_OUT) ||
        (value.name.toLocaleLowerCase().startsWith('clk') || clocks.includes(value.name.toLocaleLowerCase()) || resets.includes(value.name.toLocaleLowerCase()))) {
      signals.push(key);
    }
  });

  const parentChildren = context.parent.children;
  const processContext = parentChildren[0].parent as unknown as ParserRuleContext;
  const [sensitivityListVariables, sensitivityListLineNumber] = getProcessSensitivityListVariables(
    parentChildren as Array<ParserRuleContext>, processContext.start.line) as [string[], number];
  const processStatements = context.children;

  if (!processStatements) {
    return;
  }

  const referenceKey = `process_${context.parent.start.line}`;
  references.set(referenceKey, new Reference(
    referenceKey,
    'process',
    context.parent.start.line,
    false,
    ObjectType.PROCESS
  ));

  const reference = references.get(referenceKey);

  reference['sensitivityListVariables'] = sensitivityListVariables;
  reference['codeBlockType'] = CodeBlockType.PROCESS;
  reference['variablesRead'] = [];
  reference['variablesWrite'] = [];

  processStatements?.forEach((statement) => {
    const statementText = statement.text;

    if (statement.childCount > 0 && !isStatementComment(statementText)) {
      setAllProcessReferences(context.parent.start.line + 1, context.parent.stop.line - 1, reference);
    }
  });

  reference['variablesRead'].forEach((variable) => {
    const isClockOrReset = variable.toLocaleLowerCase().startsWith('clk') || clocks.includes(variable.toLocaleLowerCase()) || resets.includes(variable.toLocaleLowerCase());
    const variableIsRead = reference.variablesWrite.includes(variable);
    const isInSensitivityList = reference.sensitivityListVariables.includes(variable);

    if (!isClockOrReset && !variableIsRead && !isInSensitivityList) {
      const markerMessage = `Semantic error: signal ${variable} is not in the sensitivity list`;
      const markerAlreadyExists = semanticMarkers.some((marker) => marker.message === markerMessage);

      if (markerAlreadyExists) {
        return;
      }

      semanticMarkers.push(new Marker(
        sensitivityListLineNumber,
        startingWordColumn(codeLines[sensitivityListLineNumber - 1], 'process', false),
        sensitivityListLineNumber,
        endingWordColumn(codeLines[sensitivityListLineNumber - 1], 'process', false),
        markerMessage,
        MarkerSeverity.Error
      ));

      const title = `Add ${variable} to sensitivity list (line ${sensitivityListLineNumber})`;
      const beforeClosingParenthesis = endingWordColumn(codeLines[sensitivityListLineNumber - 1], ')', false);
      const afterProcessKeyword = endingWordColumn(codeLines[sensitivityListLineNumber - 1], 'process', false)
      const quickfixStartPosition = beforeClosingParenthesis > afterProcessKeyword
        ? beforeClosingParenthesis
        : afterProcessKeyword;

      const quickfixText = beforeClosingParenthesis > afterProcessKeyword
        ? `, ${variable}`
        : ` (${variable})`;

      const column = beforeClosingParenthesis > afterProcessKeyword
        ? quickfixStartPosition - 1
        : quickfixStartPosition + 1;

      const alreadyExists = semanticQuickfixes.some((quickfix) => quickfix['title'] === title);

      if (alreadyExists) {
        return;
      }

      semanticQuickfixes.push({
        'title': title,
        'text': quickfixText,
        'message': markerMessage,
        'position': {
          'startLineNumber': sensitivityListLineNumber,
          'startColumn': column,
          'endLineNumber': sensitivityListLineNumber,
          'endColumn': column
        }
      })
    }
  });
}

function checkForMultipleClocks(context: ConditionContext) {
  const contextLine = context.start.line - 1;
  const codeLine = codeLines[contextLine];
  const conditions = getNumberOfConditions(context.text);

  if (conditions.length < 2) {
    return;
  }

  const ports = new Array<string>();
  references.forEach((value: object, key: string) => {
    if (value['objectType'] === ObjectType.PORT_IN ||
        value['objectType'] === ObjectType.PORT_OUT) {
      ports.push(key);
    }
  });

  const portsInConditions = ports.filter((port) => isReferenceInString(context.text, port));
  let clocksInConditions = new Array<string>();

  portsInConditions.forEach((port) => {
    const risingClock = 'rising_edge(' + port + ')';
    const fallingClock = 'falling_edge(' + port + ')';

    if (isReferenceInString(context.text, risingClock)) {
      clocksInConditions.push(risingClock);
    } else if (isReferenceInString(context.text, fallingClock)) {
      clocksInConditions.push(fallingClock);
    }
  });

  if (clocksInConditions.length < 1) {
    return;
  }

  const markerMessage = `Semantic error: multiple clocks triggering a flip-flop`;
  const markerAlreadyExists = semanticMarkers.some((marker) => marker.message === markerMessage);

  if (markerAlreadyExists) {
    return;
  }

  const marker = new Marker(
    contextLine + 1,
    startingWordColumn(codeLine, clocksInConditions[0]),
    contextLine + 1,
    endingWordColumn(codeLine, clocksInConditions[clocksInConditions.length - 1]),
    markerMessage,
    MarkerSeverity.Error
  );

  semanticMarkers.push(marker);
}

export function checkForDuplicateImports(context: Process_statement_partContext) {
  // filter out codeBlockType Package
  // search in references for overlap between typeValues (ObjectType.Type) and codeBlockName (ObjectType.SIGNAL || ObjectType.VARIABLE || ObjectType.CONSTANT)
  const overLapVariables = new Array<string>();
  const packageReferences = Array.from(references.values()).filter((reference) => reference['codeBlockType'] === CodeBlockType.PACKAGE);
}

export function checkForIncompleteCaseStatement(caseContexts, caseAlternatives) {
  // check if alternatives include 'others' state
  let othersStateExists: boolean = false;
  caseAlternatives.forEach((caseAlternative) => {
    const caseAlternativeText = caseAlternative.text;

    if (caseAlternativeText?.toLocaleLowerCase().includes('others')) {
      othersStateExists = true;
    }
  });

  if (othersStateExists) {
    return;
  }

  let caseKeywordLineNumber: number = 0;
  let caseStatementVariable = '';
  caseContexts.forEach((caseContext) => {
    const constructorName = caseContext.constructor.name;

    if (constructorName === 'TerminalNode' && caseContext.text === 'case' && caseKeywordLineNumber === 0) {
      caseKeywordLineNumber = caseContext.symbol.line;
    }
    if (constructorName === 'ExpressionContext') {
      caseStatementVariable = caseContext.text;
    }
  });

  const caseStatementVariableReference: Reference = references.get(caseStatementVariable);

  if (!caseStatementVariableReference) {
    return;
  }

  const combinations = getReferenceBitSize(caseStatementVariableReference);

  if (!combinations || combinations === caseAlternatives.length) {
    return;
  }

  const numberOfMissingStates = combinations - caseAlternatives.length;
  const markerMessage = `Semantic error: Incomplete decision statements. Possibly missing ${numberOfMissingStates} states or default state`;

  const marker: Marker = new Marker(
    caseKeywordLineNumber,
    startingWordColumn(codeLines[caseKeywordLineNumber - 1], 'case', false),
    caseKeywordLineNumber,
    endingWordColumn(codeLines[caseKeywordLineNumber - 1], 'case', false),
    markerMessage,
    MarkerSeverity.Error
  );

  semanticMarkers.push(marker);
}

function checkForIncompleteIfStatement(ifContexts) {
  let ifKeywordLineNumber: number = 0;
  let numberOfConditions = 0;
  let ifStatementVariable = '';
  let includesElsIf = false;
  let includesElse = false;

  ifContexts.forEach((ifContext) => {
    const constructorName = ifContext.constructor.name;

    if (constructorName === 'TerminalNode' && ifContext.text === 'if') {
      numberOfConditions++;
    }
    
    if (constructorName === 'TerminalNode' && ifContext.text === 'elsif') {
      includesElsIf = true;
      numberOfConditions++;
    }

    if (constructorName === 'TerminalNode' && ifContext.text === 'else') {
      includesElse = true;
      numberOfConditions++;
    }

    if (constructorName === 'ConditionContext') {
      if (ifStatementVariable === '') {
        ifKeywordLineNumber = ifContext.start.line;
        const [left, right] = returnIfStatementVariables(ifContext.text);

        if (references.has(left)) {
          ifStatementVariable = left;
        } else if (references.has(right)) {
          ifStatementVariable = right;
        } else {
          return;
        }
      } else {
        return !isReferenceInString(ifContext.text, ifStatementVariable);
      }
    }
  });

  if (includesElse) {
    return;
  }

  const ifStatementVariableReference: Reference = references.get(ifStatementVariable);

  if (!ifStatementVariableReference) {
    return;
  }

  const combinations = getReferenceBitSize(ifStatementVariableReference);

  if (!combinations || combinations === numberOfConditions) {
    return;
  }

  const numberOfMissingStates = combinations - numberOfConditions + 1;

  if (numberOfMissingStates && includesElsIf) {
    const markerMessage = `Semantic error: Incomplete decision statements. Possibly missing ${numberOfMissingStates} states or default state`;

    const marker: Marker = new Marker(
      ifKeywordLineNumber,
      startingWordColumn(codeLines[ifKeywordLineNumber - 1], 'if', false),
      ifKeywordLineNumber,
      endingWordColumn(codeLines[ifKeywordLineNumber - 1], 'if', false),
      markerMessage,
      MarkerSeverity.Error
    );

    semanticMarkers.push(marker);
  }
}

export function clearSemanticMarkers() {
  semanticMarkers = [];
}

export function clearSemanticQuickfixes() {
  semanticQuickfixes = [];
}

