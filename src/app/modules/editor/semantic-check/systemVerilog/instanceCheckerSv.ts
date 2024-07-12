import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import { SysVerilogHDLLexer } from "../../system_verilog/syntax-check/ANTLR/SysVerilogHDLLexer";
import { Module_declarationContext, Module_interfaceContext, SysVerilogHDLParser } from "../../system_verilog/syntax-check/ANTLR/SysVerilogHDLParser";
import { SysVerilogHDLListener } from "../../system_verilog/syntax-check/ANTLR/SysVerilogHDLListener";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { DependencieProposal } from "../../system_verilog/code-completion/proposals/DependencieProposal";
import { markers, quickfixesSv, referencesSv } from "../../system_verilog/syntax-check/syntaxCheckerSv";
import { Marker, MarkerSeverity } from "../interfaces/Marker";
import { endingWordColumn, startingWordColumn } from "../syntaxUtils";
import { ObjectType } from "../interfaces/reference";

export let instanceMarkers: Marker[] = [];
export const externalDependencies: Array<DependencieProposal> = [];
let codeLines: string[] = [];
let originalCodeLines: string[] = [];
let originalModuleName: string = '';
let instancePortLines: string[] = [];
let instanceLineNumber: number = 0;

class InstanceFunctionListener implements SysVerilogHDLListener {
  enterModule_declaration(context: Module_declarationContext) {
    const subContext = context.children[3] as Module_interfaceContext;
    const lines = codeLines.slice(subContext._start.line, subContext._stop.line - 1);
    checkInstance(context, lines, true);
  }
}

export default function instanceCheckerSv(inputCode: string, originalCode: string[], moduleName: string, instancePortText: string, instanceLineStartNumber: number) {
  instanceMarkers = [];
  codeLines = inputCode.split("\n");
  originalCodeLines = originalCode;
  originalModuleName = moduleName;
  instancePortLines = instancePortText.split(',');
  instanceLineNumber = instanceLineStartNumber;

  const inputStream = new ANTLRInputStream(inputCode);
  const lexer = new SysVerilogHDLLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new SysVerilogHDLParser(tokenStream);
  const tree = parser.description_star();
  const listener: SysVerilogHDLListener = new InstanceFunctionListener();

  ParseTreeWalker.DEFAULT.walk(listener, tree);

  return instanceMarkers;
}

export function checkInstance(context: Module_declarationContext, lines: string[], useChecks: boolean) {
  const moduleName = context.module_identifier().text;
  const moduleStartLine = context._start.line;
  const moduleParameters = context.module_interface() ? context.module_interface().text : '';

  let instanceExample = moduleName + ' my_instance(';
  let instanceVariables = [];

  lines.forEach((line, index) => {
    let lineWithoutSemicolon = line
      .replace('  ', '')
      .replace(',', '')
      .replace(')', '')
      .replace(';', '');

    // remove comments
    if (lineWithoutSemicolon.includes('//')) {
      const commentIndex = lineWithoutSemicolon.indexOf('//');
      lineWithoutSemicolon = lineWithoutSemicolon.slice(0, commentIndex);
    }

    const words = lineWithoutSemicolon.split(' ').filter(word => word !== '');
    const direction = words[0];
    const variable = words[words.length - 1];
    instanceVariables.push(variable);

    if (instancePortLines.length > 0) {
      checkInstancePorts(useChecks, moduleName, variable, direction, moduleStartLine);
    }
  });

  if (!instanceVariables?.length) {
    return;
  }

  const biggestInstanceVariableLength = instanceVariables.reduce((a, b) => a?.length > b?.length ? a : b)?.length;
  instanceVariables.forEach((variable) => {
    if (!variable) {
      return;
    }

    const spaces = ' '.repeat(biggestInstanceVariableLength - variable.length);
    instanceExample += '\n  .' + variable + spaces + ' (  ),';
  });

  instanceExample = instanceExample.slice(0, -1) + '\n);';
  createExternalDependency(moduleName, moduleParameters, instanceExample);
}

function createExternalDependency(moduleName: string, moduleParameters: string, insertText: string) {
  const kind = 25;
  const insertTextRules = 4;
  const prob = 0;
  const documentation = `Instance of ${moduleName} with parameters ${moduleParameters}`;
  const label = `${moduleName} (instance)`;

  const externalDependency = new DependencieProposal(
    label,
    kind,
    insertText,
    insertTextRules,
    null,
    documentation,
    prob,
  );

  const dependencyExists = externalDependencies.find((dependency) => dependency.label === externalDependency.label);

  if (dependencyExists) {
    return;
  }

  externalDependencies.push(externalDependency);
}

function checkInstancePorts(useChecks: boolean, moduleName: string, variable: string, direction: string, moduleStartLine: number) {
  const instancePortLine = instancePortLines.find((line) => line.includes('.' + variable));
  const instancePortLineIndex = instancePortLines.findIndex((line) => line.includes('.' + variable));

  if (useChecks && instancePortLine) {
    const instanceCode = instancePortLine;
    let startIndex = instanceCode.indexOf('(');
    let endIndex = instanceCode.indexOf(')');
    let instanceVariable = '';

    if (startIndex !== -1 && endIndex !== -1) {
      instanceVariable = instanceCode.substring(startIndex + 1, endIndex).replace(/\s+/g, '');
    }

    if (direction && direction?.toLocaleLowerCase() === 'input' || direction?.toLocaleLowerCase() === 'output') {
      checkIfDirectionIsCorrect(
        direction,
        instanceVariable,
        moduleStartLine,
        instanceLineNumber + instancePortLineIndex,
        instancePortLine
      );
    }
  } else {
    checkForMissingPorts(moduleName, variable);
  }
}

function checkForMissingPorts(moduleName: string, variable: string) {
  const reference = Array.from(referencesSv.values()).find((reference) => reference.objectType === ObjectType.INSTANCE && reference.name === moduleName);
    
    if (!reference) {
      return;
    }

    const lineNumber = reference.line - 1;
    const line = originalCodeLines[lineNumber];
    const message = 'Error: Port ' + variable + ' not found in instance (line ' + (lineNumber + 1) + ')';

    const marker = new Marker(
      lineNumber + 1,
      startingWordColumn(line, moduleName),
      lineNumber + 1,
      endingWordColumn(line, moduleName),
      message,
      MarkerSeverity.Error
    );

    instanceMarkers.push(marker);

    const numberOfSpaces = startingWordColumn(line, moduleName) + 1;
    const spaces = ' '.repeat(numberOfSpaces);

    quickfixesSv.push({
      'title': `Add missing mapping for port ${variable}`,
      'text': `${spaces}.${variable} (  ),\n`,
      'message': message,
      'position': {
        startColumnNumber: startingWordColumn(line, moduleName) + 3,
        startLineNumber: lineNumber + 2,
        endColumnLine: endingWordColumn(line, moduleName) + 3,
        endLineNumber: lineNumber + 2
      }
    });
}

function checkIfDirectionIsCorrect(
  direction: string,
  variable: string,
  moduleStartLine: number,
  lineNumber: number,
  line: string
) {
  const keyStart = `${variable};${originalModuleName};`;
  const referenceKey = Array.from(referencesSv.keys()).find((k) => k.startsWith(keyStart));
  const reference = referencesSv.get(referenceKey);

  if (!referenceKey) {
    return;
  }

  const isReadOnly = direction.toLocaleLowerCase() === 'input';

  if (reference.isReadOnly !== isReadOnly) {
    const marker = new Marker(
      lineNumber + 1,
      startingWordColumn(line, '(' + variable + ')'),
      lineNumber + 1,
      endingWordColumn(line, '(' + variable + ')') - 2,
      'Error: Port ' + variable + ' does not match direction for this instance',
      MarkerSeverity.Error
    );

    const markerExists = markers.find((m) => m === marker);

    if (markerExists) {
      return;
    }

    instanceMarkers.push(marker);
  }
}

export function clearInstanceMarkers() {
  instanceMarkers = [];
}

