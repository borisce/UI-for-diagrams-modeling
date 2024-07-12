import {
  Any_case_keywordContext,
  Case_item_keyContext,
  Case_item_starContext,
  Conditional_statementContext,  
  Procedural_timing_control_statementContext,  
  Else_statementContext,  
  If_statementContext, 
  Module_itemContext,
  Always_constructContext,
  Package_declarationContext,
  Package_item_starContext,
  Package_itemContext,
  Package_identifierContext
} from '../../system_verilog/syntax-check/ANTLR/SysVerilogHDLParser';
import {
  endingWordColumn,
  getBitSize,
  getConditionExpressionVariable,
  getLineWithoutComments,
  getProcessAlwaysBlockText,
  isTypedefPackageItem,
  isReferenceInString,
  isStatementComment,
  logicalOperators,
  returnAssignmentStatementVariables,
  splitByWords,
  startingWordColumn,
  updateReferenceSensitivityListVariables,
  isAssignmentWithBitSize,
  getCharactersBetween,
  setPackageImportSize,
  setImportedTypes,
  getPackageName,
  splitConditionsByOperators,
  isPartOfElseIfStatement
} from '../syntaxUtils';
import {
  ObjectType,
  PackageImport,
  Reference
} from '../interfaces/reference';
import { SystemVerilogSemanticVisitor } from './svSemanticVisitor';
import { Marker, MarkerSeverity } from '../interfaces/Marker';

export class SystemVerilogSemanticAnalyzer {
  public codeLines: string[];
  public references: Map<string, Reference>;
  public moduleItemContexts: Module_itemContext[];
  public caseItemContext: Case_item_starContext;
  public ifStatementContexts: Conditional_statementContext[];
  public alwaysBlockContexts: Procedural_timing_control_statementContext[];
  public alwaysCombContexts: Always_constructContext[];
  public packageContexts: Package_declarationContext[];
  public semanticMarkers: Array<Marker> = [];
  public semanticQuickfixes: Array<any> = [];
  private readonly clocks = ['clock', 'clk', 'clken', 'clocks', 'clks', 'clocked', 'clocking'];
  private readonly resets = ['reset', 'rst', 'reset', 'rsts', 'reseted', 'reseting'];

  constructor(
    codeLines: string[],
    references: Map<string, Reference>,
    moduleItemContexts: Module_itemContext[],
    caseItemContext: Case_item_starContext,
    ifStatementContexts: Conditional_statementContext[],
    alwaysBlockContexts: Procedural_timing_control_statementContext[],
    alwaysCombContexts: Always_constructContext[],
    packageContexts: Package_declarationContext[]
  ) {
    this.codeLines = codeLines;
    this.references = references;
    this.moduleItemContexts = moduleItemContexts;
    this.caseItemContext = caseItemContext;
    this.ifStatementContexts = ifStatementContexts;
    this.alwaysBlockContexts = alwaysBlockContexts;
    this.alwaysCombContexts = alwaysCombContexts;
    this.packageContexts = packageContexts;
  }


  /* istanbul ignore next */
  analyzeSemantic(): [Array<Marker>, Array<any>] {
    const semanticVisitor = new SystemVerilogSemanticVisitor();
    this.semanticMarkers = [];
    this.semanticQuickfixes = [];

    this.alwaysBlockContexts.forEach((alwaysBlockContext) => {
      this.createAlwaysBlockReferences(alwaysBlockContext);
      this.checkForIncompleteSensitiveList(alwaysBlockContext);
    });

    this.packageContexts.forEach((packageContext) => {
      this.createPackageReferences(packageContext);
    });

    this.moduleItemContexts.forEach((moduleItemContext) => {
      this.checkForIncorrectPackageImports(moduleItemContext);
    });

    this.checkForDuplicateImports();

    if (this.caseItemContext) {
      this.checkForIncompleteCaseDecisionStatements();
    }

    if (this.ifStatementContexts) {
      this.ifStatementContexts.forEach((ifStatementContext) => {
        this.checkForIncompleteIfDecisionStatements(ifStatementContext);
      });
    }

    this.caseItemContext = null;
    this.ifStatementContexts = [];

    this.alwaysCombContexts.forEach((alwaysCombContext) => {
      this.checkForBlockingAssignmentsInCombinationalLogic(alwaysCombContext);
    });

    return [this.semanticMarkers, this.semanticQuickfixes];
  }

  createAlwaysBlockReferences(alwaysBlockContext: Procedural_timing_control_statementContext) {
    if (!alwaysBlockContext) {
      return;
    }

    const operators: string[] = [',', ...logicalOperators];
    const alwaysBlockText = this.codeLines[alwaysBlockContext.start.line - 1];
    const alwaysBlockTextFromAt = alwaysBlockText.substring(alwaysBlockText.indexOf('@') + 1);
    const parts = getProcessAlwaysBlockText(alwaysBlockTextFromAt, operators);

    const referenceKey = `process_${alwaysBlockContext.start.line}`;
    let reference = new Reference(
      referenceKey,
      'process',
      alwaysBlockContext.start.line,
      false,
      ObjectType.ALWAYSBLOCK
    );

    this.checkForMultipleClocks(alwaysBlockContext, parts);

    updateReferenceSensitivityListVariables(reference, parts);
    this.setProcessReferencesReadAndWrite(reference, alwaysBlockContext);
    this.references.set(referenceKey, reference);
  }

  createPackageReferences(packageContext: Package_declarationContext) {
    const packageIdentifier = packageContext?.children.filter((child) => {
      return child.constructor.name === 'Package_identifierContext';
    })[0];
    const packageStars = packageContext?.children.filter((child) => {
      return child.constructor.name === 'Package_item_starContext';
    })[0] as Package_item_starContext;
    const packageItems = packageStars?.children;
    
    if (!packageItems) {
      return;
    }

    const packageIdentifierContext = packageIdentifier as Package_identifierContext;
    const lineNumber = packageIdentifierContext.start.line;
    const referenceKey = `${packageIdentifier.text};package`;
    const keyExists = this.references.get(referenceKey);

    if (keyExists) {
      return;
    }

    const reference = new Reference(
      referenceKey,
      'package',
      lineNumber,
      false,
      ObjectType.PACKAGE
    );

    reference.name = packageIdentifier.text;
    
    packageItems?.forEach((packageItem) => {
      const packageImport: PackageImport = {
        variableName: '',
        importedTypes: [],
        size: '',
        line: 0
      };

      const packageItemContext = packageItem as Package_itemContext;
      const lineNumber = packageItemContext.start.line;
      const line = getLineWithoutComments(this.codeLines[lineNumber - 1]);
      const lineSplitted = splitByWords(line);
      let indexOffset = 1;
      packageImport.line = lineNumber;
      packageImport.packageName = packageIdentifier.text;
      const isTypedefPackage = isTypedefPackageItem(packageItem);

      if (isTypedefPackage) {
        if (isAssignmentWithBitSize(line)) {
          packageImport.size = setPackageImportSize(packageItem);
        }
  
        if (line.includes('{')) {
          packageImport.importedTypes = setImportedTypes(line);
        }
      } else if (isAssignmentWithBitSize(packageItem.text)) {
        packageImport.size = setPackageImportSize(packageItem);
      } else {
        indexOffset = line.includes('=') ? 3 : 1;
      }

      packageImport.variableName = lineSplitted[lineSplitted.length - indexOffset];
      reference.packageImports.push(packageImport);
    });

    this.references.set(referenceKey, reference);
  }

  setProcessReferencesReadAndWrite(alwaysBlockReference: Reference, alwaysBlockContext: Procedural_timing_control_statementContext) {
    const startLine = alwaysBlockContext.start.line;
    const endLine = alwaysBlockContext.stop.line - 1;
    const lines = this.codeLines.slice(startLine, endLine);
    let referenceVariables = new Array<string>();
    this.references?.forEach((value: Reference, key: string) => {
      if (value.objectType === ObjectType.PORT_IN ||
        value.objectType === ObjectType.PORT_OUT) {
          if (value.line < startLine) {
            referenceVariables.push(key);
          }
      }
    });

    lines.forEach((line) => {
      const isLineEnd = line.replace(/\s/g, '').toLocaleLowerCase() === 'end';
      if (isLineEnd) {
        return;
      }

      referenceVariables.forEach((variable) => {
        const variableName = variable.split(';')[0];
        if (isReferenceInString(line, variableName) && !isStatementComment(line)) {
          line = line.replace(/^\s+/, '');
          const regex1 = /.*<=.*/;
          const regex2 = /.*\=.*/;

          if (line.match(regex1) || line.match(regex2)) {
            const separator = line.includes('<=') ? '<=' : '=';
            const assignmentVariables = returnAssignmentStatementVariables(line, separator);
            const leftVariable = assignmentVariables[0];
            const rightVariable = assignmentVariables[1]?.replace(';', '');

            if (leftVariable === variableName && !alwaysBlockReference.variablesWrite.includes(variableName)) {
              alwaysBlockReference.variablesWrite.push(variableName);
            }

            if (rightVariable.includes(' ')) {
              if (rightVariable.includes(variableName) && !alwaysBlockReference.variablesRead.includes(variableName)) {
                alwaysBlockReference.variablesRead.push(variableName);
              }
            } else {
              if (rightVariable === variableName && !alwaysBlockReference.variablesRead.includes(variableName)) {
                alwaysBlockReference.variablesRead.push(variableName);
              }
            }
          } else {
            if (!alwaysBlockReference.variablesRead.includes(variableName)) {
              alwaysBlockReference.variablesRead.push(variableName);
            }
          }
        }
      });
    });
  }

  checkForIncompleteSensitiveList(alwaysBlockContext: Procedural_timing_control_statementContext) {
    const reference = this.references.get(`process_${alwaysBlockContext.start.line}`);

    if (!reference) {
      return;
    }

    reference.variablesRead.forEach((variable) => {
      const isClockOrReset = variable.toLocaleLowerCase().startsWith('clk') || this.clocks.includes(variable.toLocaleLowerCase()) || this.resets.includes(variable.toLocaleLowerCase());
      const variableIsRead = reference.variablesRead.includes(variable);
      const isInSensitivityList = reference.sensitivityListVariables.includes(variable);

      if (!isClockOrReset && !variableIsRead && !isInSensitivityList) {
        this.createMissingSensitivityListVariableMarker(alwaysBlockContext, variable);
      }
    });
  }

  createMissingSensitivityListVariableMarker(alwaysBlockContext: Procedural_timing_control_statementContext, variable: string) {
    const lineNumber = alwaysBlockContext.start.line;
    const unparsedLine = this.codeLines[lineNumber - 1];
    const markerMessage = `Semantic error: signal ${variable} is not in the sensitivity list`;
    
    const markerExists = this.semanticMarkers.filter((marker) => {
      return marker.startLineNumber === lineNumber && marker.message === markerMessage;
    });

    if (markerExists.length > 0) {
      return;
    }

    this.semanticMarkers.push(new Marker(
      lineNumber,
      startingWordColumn(unparsedLine, variable),
      lineNumber,
      endingWordColumn(unparsedLine, variable),
      markerMessage,
      MarkerSeverity.Error
    ));
  }

  checkForIncompleteIfDecisionStatements(ifStatementContext: Conditional_statementContext) {
    let hasElseStatement = false;
    let conditionVariableRepeat = false;
    let conditionCount = ifStatementContext?.children?.length;

    if (isPartOfElseIfStatement(this.codeLines, ifStatementContext)) {
      return;
    }

    const statementsContext = ifStatementContext.children[0] as If_statementContext;
    const conditionExpressionContext = statementsContext.children[2] as Conditional_statementContext;
    const conditionVariable = getConditionExpressionVariable(conditionExpressionContext.text);

    ifStatementContext.children.forEach((child) => {
      const constructor = child.constructor.name;

      if (constructor === 'If_statementContext') {
        const statementConditionContext = child as Conditional_statementContext;
        const conditionExpressionContext = statementConditionContext.children[2] as Conditional_statementContext;

        if (conditionExpressionContext?.constructor.name === 'Conditional_expressionContext') {
          this.checkForWrongInvertOperatorIf(conditionExpressionContext);
        }
      } else {
        const elseIfElseContext = child as Else_statementContext;
        [conditionCount, hasElseStatement, conditionVariableRepeat]  = this.checkElseIfElseContext(elseIfElseContext, conditionVariable);
      }
    });

    if (hasElseStatement || conditionCount === 1 || !conditionVariableRepeat) {
      return;
    }

    const reference = Array.from(this.references.values()).find(ref => ref.name === conditionVariable);

    let markerMessage = 'Semantic error: Incomplete decision statements.';

    if (reference) {
      const combinations = getBitSize(reference.size);

      if (combinations === conditionCount) {
        return;
      }

      markerMessage += ` Possibly missing ${combinations - conditionCount + 1} states`;
    }

    const lineNumber = statementsContext.start.line;
    const unparsedLine = this.codeLines[lineNumber - 1];

    this.semanticMarkers.push(new Marker(
      lineNumber,
      startingWordColumn(unparsedLine, 'if'),
      lineNumber,
      endingWordColumn(unparsedLine, 'if'),
      markerMessage,
      MarkerSeverity.Error
    ));
  }

  checkForIncompleteCaseDecisionStatements() {
    let caseKeywordLine = 0;
    let caseVariableName: string = '';
    const caseItemParentContext = this.caseItemContext.parent;

    caseItemParentContext.children.forEach((child) => {
      const constructor = child.constructor.name;

      if (constructor === 'Any_case_keywordContext') {
        const caseKeywordContext = child as Any_case_keywordContext;
        caseKeywordLine = caseKeywordContext.start.line;
      }
      
      if (constructor === 'Case_switchContext') {
        caseVariableName = child.text;
      }
    });

    this.checkForWrongInvertOperator();

    const reference = this.references.get(caseVariableName);

    if (!reference) {
      return;
    }

    const combinations = getBitSize(reference.size);
    const caseConditionCount = this.caseItemContext.case_item().length;
    const lastCaseConditionContext = this.caseItemContext.case_item()[caseConditionCount - 1];
    const lastCaseConditionLine = lastCaseConditionContext.start.line;
    const lastCaseCondition = this.codeLines[lastCaseConditionLine - 1];
    const lastCaseConditionIsDefault = lastCaseCondition.toLocaleLowerCase()?.includes('default');
    const numberOfMissingStates = combinations - caseConditionCount;

    if (numberOfMissingStates <= 0 || lastCaseConditionIsDefault) {
      return;
    }

    const message = `Semantic error: Incomplete decision statements. Possibly missing ${numberOfMissingStates} states`;
    const line = caseKeywordLine;
    const unparsedLine = this.codeLines[line - 1];

    this.semanticMarkers.push(new Marker(
      line,
      startingWordColumn(unparsedLine, 'case'),
      line,
      endingWordColumn(unparsedLine, 'case'),
      message,
      MarkerSeverity.Error
    ));
  }

  checkForWrongInvertOperator() {
    this.caseItemContext?.children.forEach((child) => {
      const caseContext = child as Case_item_starContext;
      const caseItemKeyContext = caseContext.children[0] as Case_item_keyContext;

      if (caseItemKeyContext.text.includes('~')) {
        const condition = this.codeLines[caseItemKeyContext.start.line - 1];
        const variableName = getConditionExpressionVariable(condition);
        const reference = Array.from(this.references.values()).find(ref => ref.name === variableName.replace('~', ''));

        if (!reference || !reference.size) {
          return;
        }

        const marker = new Marker(
          caseItemKeyContext.start.line,
          caseItemKeyContext.start.charPositionInLine + 1,
          caseItemKeyContext.stop.line,
          startingWordColumn(condition, ':'),
          "Semantic error: using incorrect way of inverting",
          MarkerSeverity.Error
        );

        // find similar markers
        const similarMarkers = this.semanticMarkers.filter((marker) => {
          return marker.startLineNumber === caseItemKeyContext.start.line &&
            marker.startColumn === caseItemKeyContext.start.charPositionInLine + 1 &&
            marker.endLineNumber === caseItemKeyContext.stop.line &&
            marker.endColumn === startingWordColumn(condition, ':');
        });

        if (similarMarkers.length === 0) {
          this.semanticMarkers.push(marker);

          this.semanticQuickfixes.push({
            'title': 'Use logical operator instead of bitwise operator',
            'text': '!',
            'message': 'Semantic error: using incorrect way of inverting',
            'position': {
              'startLineNumber': caseItemKeyContext.start.line,
              'startColumn': caseItemKeyContext.start.charPositionInLine + 1,
              'endLineNumber': caseItemKeyContext.stop.line,
              'endColumn': caseItemKeyContext.start.charPositionInLine + 2
            }
          });
        }
      }
    });
  }

  checkForWrongInvertOperatorIfElse(line: string, lineNumber: number) {
    if (!line?.includes('~')) {
      return;
    }

    const isInsideCondition = line.indexOf('(') < line.indexOf('~') && line.indexOf('~') < line.indexOf(')');

    if (!isInsideCondition) {
      return;
    }

    const similarMarkers = this.semanticMarkers.filter((marker) => {
      return marker.startLineNumber === lineNumber &&
        marker.startColumn === startingWordColumn(line, '~') &&
        marker.endLineNumber === lineNumber &&
        marker.endColumn === endingWordColumn(line, ')') - 1;
    });

    if (similarMarkers.length > 0) {
      return;
    }

    const reference = Array.from(this.references.values()).find(ref => ref.name === line.replace('~', ''));

    if (!reference || !reference.size) {
      return;
    }

    const marker = new Marker(
      lineNumber,
      startingWordColumn(line, '~'),
      lineNumber,
      endingWordColumn(line, ')') - 1,
      "Semantic error: using incorrect way of inverting",
      MarkerSeverity.Error
    );

    this.semanticMarkers.push(marker);

    this.semanticQuickfixes.push({
      'title': 'Use logical operator instead of bitwise operator',
      'text': '!',
      'message': 'Semantic error: using incorrect way of inverting',
      'position': {
        'startLineNumber': lineNumber,
        'startColumn': startingWordColumn(line, '~'),
        'endLineNumber': lineNumber,
        'endColumn': endingWordColumn(line, '~')
      }
    });
  }

  checkElseIfElseContext(elseContext: Else_statementContext, conditionVariable: string): [number, boolean, boolean] {
    let conditionVariableRepeat = false;
    let hasElseStatement = false;
    let conditionCount = 2;

    const startLine = elseContext.start.line;
    const endLine = elseContext.stop.line;

    for (let i = startLine; i <= endLine; i++) {
      const line = this.codeLines[i - 1];

      if (!conditionVariableRepeat) {
        conditionVariableRepeat = line.includes(conditionVariable);
      }

      if (line.includes('else if')) {
        conditionCount++;
      }

      if (!hasElseStatement) {
        hasElseStatement = line.includes('else') && !line.includes('else if');
      }

      this.checkForWrongInvertOperatorIfElse(line, i);
    }

    return [conditionCount, hasElseStatement, conditionVariableRepeat];
  }

  checkForBlockingAssignmentsInCombinationalLogic(alwaysCombContext: Always_constructContext) {
    const combinationAssignment = '<=';
    const startLine = alwaysCombContext.start.line;
    const endLine = alwaysCombContext.stop.line - 1;

    const contextLines = this.codeLines.slice(startLine, endLine);

    contextLines.forEach((line) => {
      if (line.includes(combinationAssignment)) {
        const lineNumber = startLine + contextLines.indexOf(line) + 1;
        const markerMessage = `Semantic error: using nonblocking assignment in combinational logic (line ${lineNumber})`;
        const markerExists = this.semanticMarkers.filter((marker) => {
          return marker.startLineNumber === lineNumber && marker.message === markerMessage;
        });

        if (markerExists.length > 0) {
          return;
        }

        const lineFromStart = line.replace(/^\s+/, '');

        this.semanticMarkers.push(new Marker(
          lineNumber,
          startingWordColumn(line, lineFromStart),
          lineNumber,
          endingWordColumn(line, lineFromStart),
          markerMessage,
          MarkerSeverity.Error
        ));

        this.semanticQuickfixes.push({
          'title': 'Use blocking assignment instead of nonblocking assignment',
          'text': '=',
          'message': markerMessage,
          'position': {
            'startLineNumber': lineNumber,
            'startColumn': startingWordColumn(line, combinationAssignment),
            'endLineNumber': lineNumber,
            'endColumn': endingWordColumn(line, combinationAssignment)
          }
        });
      }
    });
  }

  checkForMultipleClocks(alwaysBlockContext: Procedural_timing_control_statementContext, parts: string[]) {
    const posedge = 'posedge';
    const negedge = 'negedge';

    // check if parts contains more than 1 posedge or negedge
    const posedgeCount = parts.filter((part) => part.includes(posedge)).length;
    const negedgeCount = parts.filter((part) => part.includes(negedge)).length;

    if (posedgeCount > 1 || negedgeCount > 1) {
      const lineNumber = alwaysBlockContext.start.line;
      const line = this.codeLines[lineNumber - 1];
      const lineFromStart = line.replace(/^\s+/, '');
      const markerMessage = `Semantic error: multiple posedge or negedge detected`;
      const variable = posedgeCount > 1 ? posedge : negedge;
      const markerExists = this.semanticMarkers.filter((marker) => {
        return marker.startLineNumber === lineNumber && marker.message === markerMessage;
      });

      if (markerExists.length > 0) {
        return;
      }

      this.semanticMarkers.push(new Marker(
        lineNumber,
        startingWordColumn(line, lineFromStart),
        lineNumber,
        endingWordColumn(line, lineFromStart),
        markerMessage,
        MarkerSeverity.Error
      ));
    }
  }

  checkForIncorrectPackageImports(moduleItemContext: Module_itemContext) {
    const text = moduleItemContext.text;
    const lineNumber = moduleItemContext.start.line;
    const line = this.codeLines[lineNumber - 1].replace(/^\s+/, '');

    if (isReferenceInString(text, '::*')) {
      return;
    }

    const packageName = getPackageName(line);
    const packageReference = this.references.get(`${packageName};package`);

    if (!packageReference || packageReference.packageImports.length === 0) {
      return;
    }

    const message = `Semantic error: package ${packageName} is not imported correctly`;
    const markerExists = this.semanticMarkers.filter((marker) => {
      return marker.startLineNumber === lineNumber && marker.message === message;
    });

    if (markerExists.length > 0) {
      return;
    }

    this.semanticMarkers.push(new Marker(
      lineNumber,
      startingWordColumn(this.codeLines[lineNumber - 1], packageName),
      lineNumber,
      endingWordColumn(this.codeLines[lineNumber - 1], packageName),
      message,
      MarkerSeverity.Error
    ));

    const affectedCode = getCharactersBetween(line, '::', ';');
    this.semanticQuickfixes.push({
      'title': 'Import all types from package',
      'text': '::*',
      'message': message,
      'position': {
        'startLineNumber': lineNumber,
        'startColumn': startingWordColumn(this.codeLines[lineNumber - 1], affectedCode),
        'endLineNumber': lineNumber,
        'endColumn': endingWordColumn(this.codeLines[lineNumber - 1], affectedCode)
      }
    });
  }

  checkForDuplicateImports() {
    const packageImports: PackageImport[] = [];
    this.references.forEach((reference) => {
      if (reference.objectType === ObjectType.PACKAGE) {
        packageImports.push(...reference.packageImports);
      }
    });

    packageImports.forEach((packageImport) => {
      const unparsedLine = this.codeLines[packageImport.line - 1];
      const similarPackageImports = packageImports.filter((importedPackage) => {
        return importedPackage.variableName === packageImport.variableName;
      });

      if (similarPackageImports.length > 0) {
        this.createMarkerForDuplicateImports(packageImport, unparsedLine);
      }
    });
  }

  createMarkerForDuplicateImports(packageImport: PackageImport, unparsedLine: string) {
    const message = `Semantic error: Variable ${packageImport.variableName} being imported from multiple packages`;
    const markerExists = this.semanticMarkers.filter((marker) => {
      return marker.startLineNumber === packageImport.line && marker.message === message;
    });

    if (markerExists.length > 0) {
      return;
    }

    this.semanticMarkers.push(new Marker(
      packageImport.line,
      startingWordColumn(unparsedLine, packageImport.variableName),
      packageImport.line,
      endingWordColumn(unparsedLine, packageImport.variableName),
      message,
      MarkerSeverity.Error
    ));
  }

  checkForWrongInvertOperatorIf(conditionExpressionContext: Conditional_statementContext) {
    if (!conditionExpressionContext.text.includes('~')) {
      return;
    }

    const line = this.codeLines[conditionExpressionContext.start.line - 1];
    const conditions = splitConditionsByOperators(conditionExpressionContext.text);

    conditions.forEach((condition) => {
      if (condition.includes('~')) {
        const variableName = getConditionExpressionVariable(condition);
        const reference = Array.from(this.references.values()).find(ref => ref.name === variableName.replace('~', ''));

        console.log(reference);

        if (reference && reference.size !== null) {
          const marker = new Marker(
            conditionExpressionContext.start.line,
            startingWordColumn(line, `~${reference.name}`),
            conditionExpressionContext.start.line,
            endingWordColumn(line, `~${reference.name}`),
            'Semantic error: using incorrect way of inverting',
            MarkerSeverity.Error
          );

          // find similar markers
          const similarMarkers = this.semanticMarkers.filter((marker) => {
            return marker.startLineNumber === conditionExpressionContext.start.line &&
              marker.startColumn === conditionExpressionContext.start.charPositionInLine + 1 &&
              marker.endLineNumber === conditionExpressionContext.stop.line &&
              marker.endColumn === startingWordColumn(line, ')') - 1;
          });

          if (similarMarkers.length === 0) {
            this.semanticMarkers.push(marker);

            this.semanticQuickfixes.push({
              'title': 'Use logical operator instead of bitwise operator',
              'text': '!',
              'message': 'Semantic error: using incorrect way of inverting',
              'position': {
                'startLineNumber': conditionExpressionContext.start.line,
                'startColumn': startingWordColumn(line, '~'),
                'endLineNumber': conditionExpressionContext.start.line,
                'endColumn': startingWordColumn(line, '~') + 1
              }
            });
          }
        }
      }
    });
  }
}
