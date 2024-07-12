import { beforeEach, describe, expect, it } from '@jest/globals';
import { SystemVerilogModuleListener } from '../../systemverilog/system-verilog-module-listener';
import { ConditionResult } from '../../model/module-node.model';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';

function createMockConstantPrimaryContext(identifierText: string): any {
  return {
    identifier: () => ({ text: identifierText })
  };
}

function createMockConstantExpressionContext(expressions: any, primaryText: any): any {
  const primaryCtx: any = createMockConstantPrimaryContext(primaryText);
  // tslint:disable-next-line:max-line-length
  const subExpressions: any = expressions.map(expr => createMockConstantExpressionContext([], expr));

  return {
    constant_primary: () => primaryCtx,
    constant_expression: () => subExpressions,
    text: primaryText
  };
}

function createMockIfGenerateConstructContext(conditionText: string): any {
  // tslint:disable-next-line:max-line-length
  const mockConstantExpressionCtx: any = createMockConstantExpressionContext([conditionText], conditionText);
  return {
    if_generate_construct: () => ({
      constant_expression: () => mockConstantExpressionCtx,
      generate_block: () => [{}], // Assuming there's always at least one block
    })
  };
}

function createMockToken(text: string): Token {
  return {
    type: 0,
    line: 0,
    charPositionInLine: 0,
    channel: 0,
    tokenIndex: 0,
    startIndex: 0,
    stopIndex: 0,
    tokenSource: null,
    inputStream: null,
    get text(): string {
      return text;
    },
    toString(): string {
      return text;
    }
  } as Token;
}

// tslint:disable-next-line:max-line-length
function createMockCaseGenerateConstructContext(caseValue: string, caseExpressions: string[], defaultCase: boolean): any {
  const mockToken: Token = createMockToken(caseValue);

  const mockExpressions: any = caseExpressions.map(expr => ({
    text: expr,
    constant_expression: () => [{ text: expr }],
    DEFAULT: () => null
  }));

  if (defaultCase) {
    mockExpressions.push({
      text: '',
      constant_expression: () => [{ text: ''}],
      DEFAULT: () => new TerminalNode(mockToken)
    });
  }

  return {
    if_generate_construct: () => undefined, // No if construct
    case_generate_construct: () => ({
      constant_expression: () => ({ text: caseValue }),
      case_generate_item: () => mockExpressions
    })
  };
}

describe('If conditions parsing', () => {
  // tslint:disable-next-line:typedef
  let listener: SystemVerilogModuleListener;

  beforeEach(() => {
    listener = new SystemVerilogModuleListener(new Map(), [], null, new Map());
  });

  // tslint:disable-next-line:max-line-length
  it('should correctly analyze constant expressions in if conditions and mark condition as passed', () => {
    const mockCtx: any = createMockIfGenerateConstructContext('10 > 5');
    listener.enterConditional_generate_construct(mockCtx);

    expect(listener.currentCondition).toContain('10 > 5');
    expect(listener.conditionResult).toBe(ConditionResult.passed);
    expect(listener.isInIfConditionalBlock).toBeTruthy();
    expect(listener.continueCondEval).toBeFalsy();
  });

  // tslint:disable-next-line:max-line-length
  it('should correctly analyze constant expressions in if conditions and mark condition as failed', () => {
    const mockCtx: any = createMockIfGenerateConstructContext('5 > 10');
    listener.enterConditional_generate_construct(mockCtx);

    expect(listener.currentCondition).toContain('5 > 10');
    expect(listener.conditionResult).toBe(ConditionResult.failed);
    expect(listener.isInIfConditionalBlock).toBeTruthy();
    expect(listener.continueCondEval).toBeTruthy();
  });

  // tslint:disable-next-line:max-line-length
  it('should correctly analyze expressions in if conditions and mark condition as undefined due to missing parameter values', () => {
    const mockCtx: any = createMockIfGenerateConstructContext('x > 10');
    listener.enterConditional_generate_construct(mockCtx);

    expect(listener.currentCondition).toContain('x > 10');
    expect(listener.conditionResult).toBe(ConditionResult.undefined);
    expect(listener.isInIfConditionalBlock).toBeTruthy();
    expect(listener.continueCondEval).toBeTruthy();
  });
});

describe('Case conditions parsing', () => {
  let listener: SystemVerilogModuleListener;

  beforeEach(() => {
    listener = new SystemVerilogModuleListener(new Map(), [], null, new Map());
    listener.isInCaseConditionalBlock = true;
  });

  it('should correctly process a matching case expression and mark it as passed', () => {
    const mockCtx: any = createMockCaseGenerateConstructContext('8', ['8', '10', '12'], false);
    listener.enterConditional_generate_construct(mockCtx);
    expect(listener.matchedCaseIndex).toBe(0);
  });

  it('should correctly process a non-matching case expression and mark it as failed', () => {
    const mockCtx: any = createMockCaseGenerateConstructContext('7', ['8', '10', '12'], false);
    listener.enterConditional_generate_construct(mockCtx);

    expect(listener.matchedCaseIndex).toBe(null);
  });

  it('should correctly handle a default case when no match is found', () => {
    const mockCtx: any = createMockCaseGenerateConstructContext('5', ['8', '10', '12'], true);
    listener.enterConditional_generate_construct(mockCtx);

    expect(listener.matchedCaseIndex).toBe(3);
  });
});
