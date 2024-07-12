import { expect, it, describe, beforeEach } from '@jest/globals';
import { SystemVerilogSemanticAnalyzer } from './svSemanticAnalyzer';
import { ObjectType, Reference } from '../interfaces/reference';
import {
  exampleCode2,
  exampleCode4,
  exampleCode5,
  exampleCode6,
  exampleCode8,
  exampleCode9,
  exampleCode10,
  exampleCode11,
  exampleCode12,
} from './exampleCodes';
import {
  alwaysCombContexts,
  caseItemContext,
  delayEventContexts,
  ifStatementContexts,
  moduleItemContexts,
  packageContexts,
  syntaxAnalyzer
} from '../../system_verilog/syntax-check/syntaxCheckerSv';
import { getProcessAlwaysBlockText, logicalOperators } from '../syntaxUtils';

function initializeSemanticAnalyzer(code: string) {
  syntaxAnalyzer(code);

  return new SystemVerilogSemanticAnalyzer(
    code.split('\n'),
    new Map<string, Reference>(),
    null,
    null,
    null,
    null,
    null,
    null
  );
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('svSemanticAnalyzer', () => {
  beforeEach(async () => {
    await delay(200);
  });

  describe('createAlwaysReferences', () => {
    const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode2);

    it('should create reference for always blocks with starting line 66 for exampleCode2', () => {
      delayEventContexts.forEach((context) => {
        semanticAnalyzer.createAlwaysBlockReferences(context);
      });
      const expectedKey = 'process_66';
      const expectedReference = semanticAnalyzer.references?.get(expectedKey);

      expect(expectedReference).toBeDefined();
    });

    it('should not create reference for null always blocks', () => {
      const context = null;
      semanticAnalyzer.references = new Map<string, Reference>();
      semanticAnalyzer.createAlwaysBlockReferences(context);
      const numberOfReferences = semanticAnalyzer.references?.size;

      expect(numberOfReferences).toBe(0);
    });
  });


  describe('createAlwaysBlockReferences', () => {
    const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode4);

    // it('should create reference for always blocks with starting line 66 for exampleCode4', () => {
    //   semanticAnalyzer.codeLines = exampleCode4.split('\n');
    //   console.log('packageContexts', packageContexts);
    //   packageContexts.forEach((context) => {
    //     semanticAnalyzer.createPackageReferences(context);
    //   });

    //   const referencesFound = semanticAnalyzer.references?.size > 0;
    //   expect(referencesFound).toBe(true);
    // });

    it('should not create reference for null always blocks', () => {
      const context = null;
      semanticAnalyzer.references = new Map<string, Reference>();
      semanticAnalyzer.createPackageReferences(context);
      const numberOfReferences = semanticAnalyzer.references?.size;

      expect(numberOfReferences).toBe(0);
    });
  });


  describe('checkForIncompleteSensitiveList', () => {
    it('should return incomplete sensitivity list', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode5);
      const keys = ['clk', 'reset', 'enable', 'data', 'result'];
      keys.forEach((key) => {
        semanticAnalyzer.references?.set(key, new Reference(
          key,
          null,
          null,
          null,
          ObjectType.PORT_IN)
        );
      });
      semanticAnalyzer.createAlwaysBlockReferences(delayEventContexts[1]);
      semanticAnalyzer.checkForIncompleteSensitiveList(delayEventContexts[1]);

      const referenceKey = 'process_10';
      const reference = semanticAnalyzer.references?.get(referenceKey);
      const includesAll = ['clk', 'reset', 'enable'].every((variable) => reference?.sensitivityListVariables?.includes(variable));

      expect(includesAll).toBe(false);
    });

    it('should return complete sensitivity list', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode6);
      semanticAnalyzer.references = new Map<string, Reference>();

      semanticAnalyzer.createAlwaysBlockReferences(delayEventContexts[2]);
      semanticAnalyzer.checkForIncompleteSensitiveList(delayEventContexts[2]);

      const referenceKey = 'process_10';
      const reference = semanticAnalyzer.references?.get(referenceKey);
      const includesAll = ['clk', 'reset', 'enable'].every((variable) => reference?.sensitivityListVariables?.includes(variable));

      expect(includesAll).toBe(true);
    });
  });

  describe('checkForIncompleteIfDecisionStatements', () => {
    it('should not create any semantic markers for incomplete if decision statements', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode8);

      semanticAnalyzer.semanticMarkers = [];
      semanticAnalyzer.ifStatementContexts = ifStatementContexts;

      semanticAnalyzer.ifStatementContexts.forEach((context) => {
        semanticAnalyzer.checkForIncompleteIfDecisionStatements(context);
      });

      const markerMessage = 'Semantic error: Incomplete decision statements.';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(false);
    });
  });

  describe('checkForIncompleteIfDecisionStatements', () => {
    it('should create semantic markers for incomplete if decision statements', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode9);

      semanticAnalyzer.semanticMarkers = [];
      semanticAnalyzer.ifStatementContexts = ifStatementContexts;

      semanticAnalyzer.ifStatementContexts.forEach((context) => {
        semanticAnalyzer.checkForIncompleteIfDecisionStatements(context);
      });

      const markerMessage = 'Semantic error: Incomplete decision statements.';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));
    
      expect(markerFound).toBe(true);
    });
  });

  describe('checkForIncompleteCaseDecisionStatements', () => {
    const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode9);

    it('should not create any semantic markers for incomplete case decision statements', () => {
      semanticAnalyzer.semanticMarkers = [];
      semanticAnalyzer.references = new Map<string, Reference>();
      semanticAnalyzer.caseItemContext = caseItemContext;
      semanticAnalyzer.checkForIncompleteCaseDecisionStatements();
      const numberOfMarkers = semanticAnalyzer.semanticMarkers?.length;

      expect(numberOfMarkers).toBe(0);
    });
  });

  describe('checkForIncompleteCaseDecisionStatements', () => {
    it('should create semantic markers for incomplete case decision statements', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode8);
      semanticAnalyzer.references = new Map<string, Reference>();
      const reference = new Reference('input_val', null, null, null, null);
      reference.size = '[3:0]';
      semanticAnalyzer.references.set('input_val', reference);

      semanticAnalyzer.semanticMarkers = [];
      semanticAnalyzer.caseItemContext = caseItemContext;
      semanticAnalyzer.checkForIncompleteCaseDecisionStatements();

      const markerMessage = 'Semantic error: Incomplete decision statements.';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(true);
    });
  });

  describe('checkForWrongInvertOperator', () => {
    it('should not create semantic markers for incomplete case decision statements', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode9);
      semanticAnalyzer.references = new Map<string, Reference>();
      semanticAnalyzer.semanticMarkers = [];
      semanticAnalyzer.caseItemContext = caseItemContext;
      semanticAnalyzer.checkForWrongInvertOperator();

      const numberOfMarkers = semanticAnalyzer.semanticMarkers?.length;

      expect(numberOfMarkers).toBe(0);
    });
  });

  describe('checkForBlockingAssignmentsInCombinationalLogic', () => {
    it('should create semantic markers for blocking assignments in combinational logic', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode9);

      semanticAnalyzer.semanticMarkers = [];
      alwaysCombContexts.forEach((context) => {
        semanticAnalyzer.checkForBlockingAssignmentsInCombinationalLogic(context);
      });

      const markerMessage = 'Semantic error: using nonblocking assignment in combinational logic';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(true);
    });

    it('should not create semantic markers for blocking assignments in combinational logic', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode8);

      semanticAnalyzer.semanticMarkers = [];
      semanticAnalyzer.references = new Map<string, Reference>();
      alwaysCombContexts.forEach((context) => {
        semanticAnalyzer.checkForBlockingAssignmentsInCombinationalLogic(context);
      });

      const markerMessage = 'Semantic error: using nonblocking assignment in combinational logic';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(false);
    });
  });

  describe('checkForMultipleClocks', () => {
    it('should create semantic markers for multiple clocks', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode10);

      semanticAnalyzer.codeLines = exampleCode10.split('\n');
      semanticAnalyzer.semanticMarkers = [];
      const context = delayEventContexts[delayEventContexts.length - 1];
      const operators: string[] = [',', ...logicalOperators];
      const alwaysBlockText = semanticAnalyzer.codeLines[context.start.line - 1];

      if (!alwaysBlockText) {
        return;
      }

      const alwaysBlockTextFromAt = alwaysBlockText.substring(alwaysBlockText.indexOf('@') + 1);
      const parts = getProcessAlwaysBlockText(alwaysBlockTextFromAt, operators);
      semanticAnalyzer.checkForMultipleClocks(context, parts);

      const markerMessage = 'Semantic error: multiple posedge or negedge detected';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(true);
    });

    it('should not create semantic markers for multiple clocks', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode8);

      semanticAnalyzer.codeLines = exampleCode8.split('\n');
      semanticAnalyzer.semanticMarkers = [];
      const context = delayEventContexts[delayEventContexts.length - 1];
      const operators: string[] = [',', ...logicalOperators];
      const alwaysBlockText = semanticAnalyzer.codeLines[context.start.line - 1];

      if (!alwaysBlockText) {
        return;
      }

      const alwaysBlockTextFromAt = alwaysBlockText.substring(alwaysBlockText.indexOf('@') + 1);
      const parts = getProcessAlwaysBlockText(alwaysBlockTextFromAt, operators);
      semanticAnalyzer.checkForMultipleClocks(context, parts);

      const markerMessage = 'Semantic error: multiple clocks in always block';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(false);
    });
  });

  describe('checkForIncorrectPackageImports', () => {
    it('should not create semantic markers for incorrect package imports', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode11);
      semanticAnalyzer.semanticMarkers = [];
      semanticAnalyzer.references = new Map<string, Reference>();
      semanticAnalyzer.codeLines = exampleCode11.split('\n');

      packageContexts.forEach((packageContext) => {
        semanticAnalyzer.createPackageReferences(packageContext);
      });
      moduleItemContexts.forEach((context) => {
        semanticAnalyzer.checkForIncorrectPackageImports(context);
      });

      const markerMessage = 'Semantic error: package chip_types is not imported correctly';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(false);
    });

    it('should create semantic markers for incorrect package imports', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode12);
      semanticAnalyzer.semanticMarkers = [];
      //semanticAnalyzer.references = new Map<string, Reference>();
      semanticAnalyzer.codeLines = exampleCode12.split('\n');

      packageContexts.forEach((packageContext) => {
        semanticAnalyzer.createPackageReferences(packageContext);
      });

      moduleItemContexts.forEach((context) => {
        semanticAnalyzer.checkForIncorrectPackageImports(context);
      });

      const markerMessage = 'Semantic error: package chip_types is not imported correctly';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(true);
    });

    it ('should not create semantic markers for duplicate imports', () => {
      const semanticAnalyzer = initializeSemanticAnalyzer(exampleCode12);
      semanticAnalyzer.semanticMarkers = [];
      semanticAnalyzer.references = new Map<string, Reference>();
      semanticAnalyzer.codeLines = exampleCode12.split('\n');

      packageContexts.forEach((packageContext) => {
        semanticAnalyzer.createPackageReferences(packageContext);
      });

      moduleItemContexts.forEach((context) => {
        semanticAnalyzer.checkForIncorrectPackageImports(context);
      });

      semanticAnalyzer.checkForDuplicateImports();

      const markerMessage = 'Semantic error: Variable';
      const markerFound = semanticAnalyzer.semanticMarkers?.some((marker) => marker.message.startsWith(markerMessage));

      expect(markerFound).toBe(true);
    });
  });
});

