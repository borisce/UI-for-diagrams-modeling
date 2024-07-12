import { MarkerSeverity } from "../interfaces/Marker";
import { Case_statementContext, If_statementContext } from "../../vhdl/syntax-check/ANTLR/vhdlParser";
import {
  architectureProcessStatementPartContexts,
  architectureStatementPartContext,
  decisionContexts,
  markers,
  syntaxAnalyzer
} from "../../vhdl/syntax-check/syntaxChecker";
import {
  incompleteDecisionStatements,
  incompleteDecisionStatementsCaseVersion,
  incompleteSensitivityList,
  incompleteSensitivityListWrong,
  noRaceConditions,
  raceConditions,
  twoClocks
} from "./exampleCodesVhdl";
import {
  VHDLSemanticVisitor,
  checkForIncompleteCaseStatement,
  checkForIncompleteSensitivityList,
  checkForRaceConditions,
  semanticMarkers
} from "./vhdlSemanticVisitor";
import { expect, it, describe } from '@jest/globals';


function initializeSemanticAnalyzer(code: string) {
    syntaxAnalyzer(code);

    return new VHDLSemanticVisitor(
      architectureProcessStatementPartContexts,
      architectureStatementPartContext,
      decisionContexts
    );
}

describe('VHDL Semantic Visitor', () => {
  describe('checkForIncompleteSensitivityList', () => {
    it ('it should not create an error if the sensitivity list is incomplete', () => {
      initializeSemanticAnalyzer(incompleteSensitivityList);

      architectureProcessStatementPartContexts.forEach((context) => {
        checkForIncompleteSensitivityList(context);
      });

      const numberOfErrors = markers.filter(marker => marker.severity === MarkerSeverity.Error).length;
      expect(numberOfErrors).toBe(0);
    });

    it ('it should create an error if the sensitivity list is incomplete', () => {
      initializeSemanticAnalyzer(incompleteSensitivityListWrong);

      architectureProcessStatementPartContexts.forEach((context) => {
        checkForIncompleteSensitivityList(context);
      });

      const markerExists = semanticMarkers.some(marker => marker.message === 'Semantic error: signal Input is not in the sensitivity list');
      expect(markerExists).toBe(true);
    });
  });

  describe('checkForIncompleteCaseStatement', () => {
    it ('it should create an error if the case statement is incomplete', () => {
      const semanticVisitor = initializeSemanticAnalyzer(incompleteDecisionStatementsCaseVersion);

      decisionContexts.forEach((context) => {
        const [caseContexts, caseAlternatives] = semanticVisitor.visitCase_statement(context as unknown as Case_statementContext);
        checkForIncompleteCaseStatement(caseContexts, caseAlternatives);
      });

      const markerMessage = 'Semantic error: Incomplete decision statements. Possibly missing 4 states or default state';
      const markerExists = semanticMarkers.some(marker => marker.message === markerMessage);

      expect(markerExists).toBe(true);
    });
  });

  describe('checkForIncompleteIfStatement', () => {
    it('it should create an error if the if statement is incomplete', () => {
      const semanticVisitor = initializeSemanticAnalyzer(incompleteDecisionStatements);

      decisionContexts.forEach((context) => {
        semanticVisitor.visitIf_statement(context as If_statementContext);
      });

      const markerMessage = 'Semantic error: Incomplete decision statements. Possibly missing 5 states or default state';
      const markerExists = semanticMarkers.some(marker => marker.message === markerMessage);

      expect(markerExists).toBe(true);
    });

    it('it should not create an error if the if statement is complete', () => {
      const completeDecisionStatements = incompleteDecisionStatements.replace(
        'end if;',
        `else
        nstate <= "001";
      end if;`);
        const semanticVisitor = initializeSemanticAnalyzer(completeDecisionStatements);

        decisionContexts.forEach((context) => {
          semanticVisitor.visitIf_statement(context as If_statementContext);
        });

        expect(semanticMarkers?.length).toBe(0);
    });
  });

  describe('checkForMultipleClocks', () => {
    it ('it should create an error if there are multiple clocks in the sensitivity list', () => {
      const semanticVisitor = initializeSemanticAnalyzer(twoClocks);
      semanticVisitor.visitIf_statement(architectureStatementPartContext);

      const markerExists = semanticMarkers.some(marker => marker.message === 'Semantic error: multiple clocks triggering a flip-flop');

      expect(markerExists).toBe(true);
    });

    it ('it should not create an error if there is only one clock in the sensitivity list', () => {
      // replace -> if (rising_edge(clk1) or rising_edge(reset)) then
      const oneClock = twoClocks.replace(
        'if (rising_edge(clk1) or rising_edge(reset)) then',
        'if (rising_edge(clk1)) then'
      );
      const semanticVisitor = initializeSemanticAnalyzer(oneClock);

      semanticVisitor.visitIf_statement(architectureStatementPartContext);
      const markerExists = semanticMarkers.some(marker => marker.message === 'Semantic error: multiple clocks triggering a flip-flop');

      expect(markerExists).toBe(false);
    });
  });

  describe('checkForRaceConditions', () => {
    it ('it should create an error for race condition', () => {
      const semanticVisitor = initializeSemanticAnalyzer(raceConditions);

      checkForRaceConditions(architectureProcessStatementPartContexts);

      const markerMessage = 'Semantic error: Race condition for out1';
      const markerExists = semanticMarkers.some(marker => marker.message === markerMessage);

      expect(markerExists).toBe(true);
    });

    it('it should not create an error for race condition', () => {
      const semanticVisitor = initializeSemanticAnalyzer(noRaceConditions);
      checkForRaceConditions(architectureProcessStatementPartContexts);

      const markerMessage = 'Semantic error: Race condition for out1';
      const markerExists = semanticMarkers.some(marker => marker.message === markerMessage);

      expect(markerExists).toBe(false);
    });
  });
});