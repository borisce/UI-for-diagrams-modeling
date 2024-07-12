import { SystemVerilogParserListener } from './ANTLR/SystemVerilogParserListener';
import {
  Assignment_operatorContext,
  Case_generate_constructContext,
  Conditional_generate_constructContext,
  Constant_expressionContext,
  Constant_param_expressionContext,
  Constant_primaryContext,
  Genvar_expressionContext,
  Genvar_iterationContext,
  IdentifierContext,
  If_generate_constructContext,
  Inc_or_dec_operatorContext,
  List_of_param_assignmentsContext, Local_parameter_declarationContext,
  Loop_generate_constructContext,
  Module_declarationContext,
  Module_headerContext,
  Module_identifierContext,
  Module_program_interface_instantiationContext,
  Param_assignmentContext,
  Parameter_declarationContext,
  Parameter_identifierContext,
  Parameter_value_assignmentContext
} from './ANTLR/SystemVerilogParser';
import { ConditionResult, ModuleInstance, ModuleNode } from '../model/module-node.model';
import { ModuleInstanceNew, ParameterType } from '../model/module-instance.model';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { ForLoopStructure } from '../model/for-loop.model';

export class SystemVerilogModuleListener implements SystemVerilogParserListener {

  constructor(private modulesMap: Map<string, ModuleNode>,
              public moduleInstances: ModuleInstanceNew[],
              private currentInstance: ModuleInstanceNew,
              private packageParameterMap: Map<string, string>) {
  }
  public moduleStack: ModuleNode[] = [];
  public isInIfConditionalBlock: boolean = false;
  public isInCaseConditionalBlock: boolean = false;
  public isInForLoop: boolean = false;
  public forLoopIterationCount: number = 0;
  public conditionResult: ConditionResult = ConditionResult.passed;
  public continueCondEval: boolean = true;
  public matchedCaseIndex: number | null = null;
  public moduleInstanceIndex: number = 0;
  public currentCondition: string = '';
  private moduleParameters: Map<string, string> = new Map<string, string>();

  public enterModule_declaration(ctx: Module_declarationContext): void {
    const moduleName: string = this.extractModuleNameFromHeader(ctx.module_header());
    let moduleNode: ModuleNode = this.modulesMap.get(moduleName);

    if (!moduleNode) {
      moduleNode = {
        name: moduleName,
        instantiatedModules: new Map<string, ModuleInstance>(),
      };
      this.modulesMap.set(moduleName, moduleNode);
    }

    this.moduleStack.push(moduleNode);
  }

  public exitModule_declaration(ctx: Module_declarationContext): void {
    this.moduleStack.pop();
  }

  // tslint:disable-next-line:max-line-length
  public enterModule_program_interface_instantiation(ctx: Module_program_interface_instantiationContext): void {
    const instanceName: string = ctx.instance_identifier().text;
    const parentModule: ModuleNode = this.moduleStack[this.moduleStack.length - 1];
    const moduleInstance: ModuleInstanceNew = {
      name: instanceName,
      instantiatedBy: parentModule.name,
      passedParameters: new Map<string, string>(),
      parameterType: ParameterType.named,
      conditionResult: ConditionResult.passed,
      condition: this.currentCondition,
      instantiatedCount: 1
    };
    if (this.isInIfConditionalBlock) {
      moduleInstance.conditionResult = this.conditionResult;
      if (this.conditionResult === ConditionResult.passed) {
        this.conditionResult = ConditionResult.failed;
        this.currentCondition = '';
      }
    } else if (this.isInCaseConditionalBlock) {
      if (this.matchedCaseIndex == null || this.moduleInstanceIndex !== this.matchedCaseIndex) {
        moduleInstance.conditionResult = ConditionResult.failed;
      }
      this.moduleInstanceIndex++;
    }
    if (this.isInForLoop) {
      moduleInstance.instantiatedCount = this.forLoopIterationCount;
    }
    this.extractParameterOverrides(ctx, moduleInstance);
    this.moduleInstances.push(moduleInstance);
  }

  public enterParameter_declaration(ctx: Parameter_declarationContext): void {
    const parentModule: ModuleNode = this.moduleStack[this.moduleStack.length - 1];

    if (!parentModule) { return; }

    const paramAssignmentsCtx: List_of_param_assignmentsContext = ctx.list_of_param_assignments();
    if (paramAssignmentsCtx) {
      // tslint:disable-next-line:max-line-length
      this.extractParamAssignments(paramAssignmentsCtx, parentModule.name);
    }
  }

  public enterLocal_parameter_declaration(ctx: Local_parameter_declarationContext): void {
    const parentModule: ModuleNode = this.moduleStack[this.moduleStack.length - 1];

    if (!parentModule) { return; }

    const paramAssignmentsCtx: List_of_param_assignmentsContext = ctx.list_of_param_assignments();
    if (paramAssignmentsCtx) {
      // tslint:disable-next-line:max-line-length
      this.extractParamAssignments(paramAssignmentsCtx, parentModule.name);
    }
  }

  // tslint:disable-next-line:max-line-length
  private extractParamAssignments(ctx: List_of_param_assignmentsContext, scopeName: string): void {
    ctx.children.forEach((child) => {
      if (child instanceof Param_assignmentContext) {
        // tslint:disable-next-line:max-line-length
        const paramNameCtx: any = child.children.find(c => c instanceof Parameter_identifierContext);
        // tslint:disable-next-line:max-line-length
        const paramValueCtx: any = child.children.find(c => c instanceof Constant_param_expressionContext);

        const paramName: string = paramNameCtx ? paramNameCtx.text : null;
        const paramValue: string = paramValueCtx ? paramValueCtx.text : null;
        if (paramName && paramValue) {
          if (!this.moduleParameters.has(paramName)) {
            this.moduleParameters.set(paramName, paramValue);
          }
        }
      }
    });
  }

  public extractModuleNameFromHeader(context: Module_headerContext): string | null {
    if (context.module_identifier) {
      const identifierContext: IdentifierContext = context.module_identifier().identifier();
      if (identifierContext) {
        return identifierContext.text;
      }
    }

    for (const child of context.children) {
      if (child instanceof Module_identifierContext) {
        const identifierContext: IdentifierContext = child.identifier();
        if (identifierContext) {
          return identifierContext.text;
        }
      }
    }

    return null;
  }

  // tslint:disable-next-line:max-line-length
  private extractParameterOverrides(ctx: Module_program_interface_instantiationContext, moduleInstance: ModuleInstanceNew): void {
    const overridesMap: Map<string, string> = new Map<string, string>();

    // tslint:disable-next-line:max-line-length
    const paramValueAssignmentCtx: Parameter_value_assignmentContext = ctx.parameter_value_assignment();
    if (paramValueAssignmentCtx) {
      const listOfParamAssignments: any = paramValueAssignmentCtx.list_of_parameter_assignments();

      if (listOfParamAssignments) {
        // Handle named parameter assignments
        listOfParamAssignments.named_parameter_assignment()?.forEach((assignment) => {
          const paramName: string = assignment.parameter_identifier().text;
          const paramValue: string = assignment.param_expression()?.text;
          if (paramName && paramValue) {
            overridesMap.set(paramName, paramValue);
          }
        });

        // Handle unnamed parameter assignments
        // tslint:disable-next-line:max-line-length
        if (listOfParamAssignments.ordered_parameter_assignment && listOfParamAssignments.named_parameter_assignment().length === 0) {
          moduleInstance.parameterType = ParameterType.ordered;
          listOfParamAssignments.ordered_parameter_assignment()?.forEach((assignment, index) => {
            const paramValue: string = assignment.param_expression()?.text;
            if (paramValue) {
              overridesMap.set(`ordered_param_${index + 1}`, paramValue);
            }
          });
        }
      }
    }
    moduleInstance.passedParameters = overridesMap;
  }

  public preprocessBinaryLiterals(expression: string): string {
    return expression.replace(/(\d)'b([01]+)/g, (match, size, value) => `0b${value}`);
  }

  public preprocessVectors(variables: {[key: string]: string}): {[key: string]: number} {
    const preprocessedVariables: {[key: string]: number} = {};
    for (const [key, value] of Object.entries(variables)) {
      const binaryMatch: RegExpMatchArray = value.match(/^\d+'b([01]+)$/);
      if (binaryMatch) {
        preprocessedVariables[key] = parseInt(binaryMatch[1], 2);
      } else {
        const numericValue: number = Number(value);
        preprocessedVariables[key] = isNaN(numericValue) ? 0 : numericValue;
      }
    }
    return preprocessedVariables;
  }

  public evaluateExpression(expression: string, variables: any): ConditionResult {
    try {
      expression = this.preprocessBinaryLiterals(expression);
      const preprocessedVariables: {[p: string]: number} = this.preprocessVectors(variables);
      const args: string = Object.keys(preprocessedVariables).join(',');
      const functionBody: string = `return ${expression};`;
      const evaluator: any = new Function(args, functionBody);
      if (Object.keys(preprocessedVariables).length === 0) {
        if (evaluator()) {
          return ConditionResult.passed;
        } else {
          return ConditionResult.failed;
        }
      } else {
        if (evaluator(...Object.values(preprocessedVariables))) {
          return ConditionResult.passed;
        } else {
          return ConditionResult.failed;
        }
      }
    } catch (error) {
      return ConditionResult.undefined;
    }
  }

  private analyzeConstantExpression(ctx: Constant_expressionContext): string[] {
    let variableNames: string[] = [];

    if (ctx.constant_primary()) {
      variableNames = variableNames.concat(this.analyzeConstantPrimary(ctx.constant_primary()));
    }

    if (ctx.constant_expression()) {
      ctx.constant_expression().forEach(expressionCtx => {
        variableNames = variableNames.concat(this.analyzeConstantExpression(expressionCtx));
      });
    }
    return variableNames;
  }

  // This method now returns an array of strings (variable names)
  private analyzeConstantPrimary(primaryCtx: Constant_primaryContext): string[] {
    const variableNames: string[] = [];
    // if (primaryCtx.primary_literal()) {
    //   console.log(`Found literal: ${primaryCtx.primary_literal().text}`);
    // }
    if (primaryCtx.identifier()) {
      variableNames.push(primaryCtx.identifier().text);
    }
    return variableNames;
  }

  private resolveVariables(expression: string, identifier: string): string {
    const variableRegex: RegExp = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    return expression.replace(variableRegex, (match, varName) => {
      if (varName === identifier) {
        return varName;
      } else {
        const value: string = this.getValueForParameter(varName, -1);
        return value !== '' ? value : varName;
      }
    });
  }

  public enterLoop_generate_construct(ctx: Loop_generate_constructContext): void {
    this.isInForLoop = true;
    const identifier: string = ctx.genvar_initialization().genvar_identifier().text;

    const operationRaw: string = this.processIterationContext(ctx.genvar_iteration());
    const operation: string = this.resolveVariables(operationRaw, identifier);
    const initialValueRaw: string = ctx.genvar_initialization().constant_expression().text;
    const initialValue: string = this.resolveVariables(initialValueRaw, identifier);
    const expressionRaw: string = ctx.genvar_expression().text;
    const expression: string = this.resolveVariables(expressionRaw, identifier);

    const loopStructure: ForLoopStructure = {
      identifier,
      initialValue,
      operation,
      expression
    };
    this.forLoopIterationCount = this.evaluateForLoop(loopStructure);
  }

  private processIterationContext(ctx: Genvar_iterationContext): string {
    let operation: string;

    if (ctx.genvar_identifier()) {
      operation = ctx.genvar_identifier().text;
    }

    const assignmentOpCtx: Assignment_operatorContext = ctx.assignment_operator();
    if (assignmentOpCtx) {
      operation += ' ' + assignmentOpCtx.text + ' ';
      const expressionCtx: Genvar_expressionContext = ctx.genvar_expression();
      if (expressionCtx) {
        if (operation.includes('+=') || operation.includes('-=') ||
            operation.includes('*=') || operation.includes('/=')) {
          operation += expressionCtx.text;
        } else {
          operation = expressionCtx.text;
        }
      }
    } else {
      const incOrDecOpCtx: Inc_or_dec_operatorContext = ctx.inc_or_dec_operator();
      if (incOrDecOpCtx) {
        operation += incOrDecOpCtx.text;
      }
    }
    return operation;
  }

  private evaluateForLoop(loop: ForLoopStructure): number {
    let currentValue: number = parseInt(loop.initialValue, 10);
    let loopCount: number = 0;
    const startTime: number = Date.now();

    while (this.checkLoopCondition(currentValue, loop.expression)) {
      if ((Date.now() - startTime) > 5000) { // 5000 milliseconds equals 5 seconds
        console.error('Loop processing exceeded 5 seconds, exiting loop.');
        if (loopCount === 0) {
          loopCount = 1;
        }
        break;
      }

      // tslint:disable-next-line:max-line-length
      const newValue: number = this.processIteration(currentValue, loop.operation, loop.identifier);
      if (newValue === currentValue) {
        console.error('Unable to process loop iteration properly, exiting loop.');
        break;
      }
      currentValue = newValue;
      loopCount++;
    }
    return loopCount;
  }

  private checkLoopCondition(currentValue: number, expression: string): boolean {
    const match: RegExpMatchArray = expression.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*(<=?|>=?|==|!=)\s*(\d+)/);
    if (!match) { return false; }

    const [, identifier, operator, value]: any = match;
    const limit: number = parseInt(value, 10);

    switch (operator) {
      case '<': return currentValue < limit;
      case '<=': return currentValue <= limit;
      case '>': return currentValue > limit;
      case '>=': return currentValue >= limit;
      case '==': return currentValue === limit;
      case '!=': return currentValue !== limit;
      default: return false;
    }
  }

  private processIteration(currentValue: number, operation: string, identifier: string): number {
    if (operation.includes(identifier + '++')) {
      return currentValue + 1;
    } else if (operation.includes(identifier + '--')) {
      return currentValue - 1;
    }

    const compoundOpRegex: RegExp = new RegExp('\\b' + identifier + '\\s*(\\+=|-=|\\*=|/=)\\s*(\\d+)');
    const match: RegExpMatchArray = operation.match(compoundOpRegex);
    if (match) {
      // tslint:disable-next-line:typedef
      const [, op, value] = match;
      const num: number = parseInt(value, 10);
      switch (op) {
        case '+=': return currentValue + num;
        case '-=': return currentValue - num;
        case '*=': return currentValue * num;
        case '/=': return currentValue / num;
        default: return currentValue; // Return unchanged if operation not recognized
      }
    } else {
      // tslint:disable-next-line:max-line-length
      const safeExpr: string = operation.replace(new RegExp('\\b' + identifier + '\\b', 'g'), currentValue.toString());
      try {
        // tslint:disable-next-line:no-eval
        const newValue: number = eval(safeExpr);
        if (typeof newValue === 'number') {
          return newValue;
        } else {
          console.error('Evaluated expression did not result in a number:', newValue);
          return currentValue;
        }
      } catch (error) {
        console.error('Error evaluating expression:', safeExpr, error);
        return currentValue;
      }
    }
  }

  public exitLoop_generate_construct(ctx: Loop_generate_constructContext): void {
    this.isInForLoop = false;
    this.forLoopIterationCount = 0;
  }

  public enterConditional_generate_construct(ctx: Conditional_generate_constructContext): void {
    this.currentCondition = '';
    if (ctx.if_generate_construct()) {
      this.isInIfConditionalBlock = true;
      const ifCtx: If_generate_constructContext = ctx.if_generate_construct();
      const condition: string = ifCtx.constant_expression().text;
      const parameterNames: string[] = this.extractParameterNames(condition);
      const parameterNames2: string[] = this.analyzeConstantExpression(ifCtx.constant_expression());
      // tslint:disable-next-line:max-line-length
      const mergedParameterNames: string[] = Array.from(new Set([...parameterNames, ...parameterNames2]));

      // tslint:disable-next-line:max-line-length
      const parameterValueSet: {[key: string]: string} = this.createParameterValueSetForCondition(mergedParameterNames);
      this.currentCondition = 'if (' + condition + ')';
      if (parameterValueSet != null) {
        this.currentCondition += ' #with params: ';
        for (const [paramName, value] of Object.entries(parameterValueSet)) {
          if (value) {
            this.currentCondition += `${paramName}=${value}, `;
          }
        }
        if (Object.keys(parameterValueSet).length > 0) {
          this.currentCondition = this.currentCondition.trim().slice(0, -1);
        }
      }

      const hasElse: boolean = ifCtx.generate_block().length > 1;
      if (!hasElse) {
        this.continueCondEval = true;
      }
      if (this.continueCondEval) {
        console.log('-----------IF STATEMENT-----------');
        console.log('Podmienka:', condition);
        console.log('Parameter názov-hodnota:', parameterValueSet);
        if (parameterValueSet != null) {
          this.conditionResult = this.evaluateExpression(condition, parameterValueSet);
          if (this.conditionResult === ConditionResult.passed) {
            this.currentCondition += '; result: PASSED';
            this.continueCondEval = false;
          } else if (this.conditionResult === ConditionResult.undefined) {
            this.currentCondition += '; result: UNDEFINED';
          } else {
            this.currentCondition += '; result: FAILED';
          }
        } else {
          this.conditionResult = ConditionResult.undefined;
          this.currentCondition += '; result: UNDEFINED';
        }
        console.log('--------END IF STATEMENT----------');
      } else {
        this.conditionResult = ConditionResult.failed;
        this.currentCondition += '; result: FAILED';
      }
    } else if (ctx.case_generate_construct()) {
      this.isInCaseConditionalBlock = true;
      this.matchedCaseIndex = null;
      this.moduleInstanceIndex = 0;
      const caseCtx: Case_generate_constructContext = ctx.case_generate_construct();
      const caseParameterName: string = caseCtx.constant_expression().text;
      let caseParameterValue: string = this.getValueForParameter(caseParameterName, 0);
      if (!caseParameterValue) {
        caseParameterValue = caseParameterName;
      }
      let matched: boolean = false;

      caseCtx.case_generate_item().forEach((caseItemCtx, index) => {
        const caseExpressions: Constant_expressionContext[] = caseItemCtx.constant_expression();
        const isDefaultCase: TerminalNode = caseItemCtx.DEFAULT();
        if (!isDefaultCase) {
          caseExpressions.forEach(expressionCtx => {
            const expression: string = expressionCtx.text;
            if (expression === caseParameterValue && !matched) {
              this.matchedCaseIndex = index;
              matched = true;
            }
          });
        } else if (!matched) {
          this.matchedCaseIndex = index;
        }
      });
    }
  }

  public exitConditional_generate_construct(ctx: Conditional_generate_constructContext): void {
    this.isInIfConditionalBlock = false;
    this.isInCaseConditionalBlock = false;
    this.conditionResult = ConditionResult.passed;
    this.currentCondition = '';
  }

  // tslint:disable-next-line:max-line-length
  public createParameterValueSetForCondition(parameterNames: string[]): {[key: string]: string} | null  {
    const parameterValueSet: {[key: string]: string} = {};
    parameterNames.forEach((parameterName: string, index: number) => {
      const value: string = this.getValueForParameter(parameterName, index);
      if (value === '') {
        return null;
      } else {
        parameterValueSet[parameterName] = value;
      }
    });
    return parameterValueSet;
  }

  public getValueForParameter(parameterName: string, order: number): string {
    let parameterValue: string = null;
    if (this.currentInstance != null && this.currentInstance.passedParameters.has(parameterName)) {
      parameterValue = this.currentInstance.passedParameters.get(parameterName);
    } else if (this.currentInstance != null &&
               this.currentInstance.parameterType === ParameterType.ordered) {
      const keys: string[] = Array.from(this.currentInstance.passedParameters.keys());
      if (order >= 0 && order < keys.length) {
        const key: string = keys[order];
        parameterValue = this.currentInstance.passedParameters.get(key);
      }
    } else if (this.moduleParameters.has(parameterName)) {
      parameterValue = this.moduleParameters.get(parameterName);
    } else if (this.packageParameterMap.has(parameterName)) {
      parameterValue = this.packageParameterMap.get(parameterName);
    }
    if (parameterValue) {
      return parameterValue;
    } else {
      return '';
    }
  }

  public extractParameterNames(condition: string): string[] {
    const parameterNamePattern: RegExp = /\b([A-Za-z_][A-Za-z0-9_]*)\b/g;
    let match: any;
    const parameters: string[] = [];
    // tslint:disable-next-line:no-conditional-assignment
    while ((match = parameterNamePattern.exec(condition)) !== null) {
      parameters.push(match[1]);
    }
    return parameters.filter((value, index, self) => self.indexOf(value) === index);
  }
}
