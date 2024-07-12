import { Reference } from './interfaces/reference'
import { references } from '../vhdl/syntax-check/syntaxChecker';

export const logicalOperators = ['and', 'or', 'not', 'nand', 'nor', 'xor', 'xnor'];
export const ternalOperators = ['&&'];

export function sliceStringBeforeWord(string: string, word: string) {
  return string.includes(word)
    ? string.slice(0, string.indexOf(word))
    : string;
}

export function startingWordColumn(string: string, word: string, caseSensitive: boolean = true) {
  if (!caseSensitive) {
    string = string?.toLocaleLowerCase();
    word = word?.toLocaleLowerCase();
  }

  const numberOfSpacesBeforeString = string?.search(/\S|$/) || 0;

  return string?.includes(word)
    ? string?.indexOf(word) + 1
    : numberOfSpacesBeforeString + 1;
}

export function endingWordColumn(string: string, word: string, caseSensitive: boolean = true) {
  if (!caseSensitive) {
    string = string?.toLocaleLowerCase();
    word = word?.toLocaleLowerCase();
  }
  
  return string?.includes(word)
    ? string?.indexOf(word) + word?.length + 1
    : string?.length + 1;
}

export function isReferenceInString(string: string, reference: string) {
  string = string.toLocaleLowerCase();
  reference = reference.toLocaleLowerCase();

  return string.includes(reference);
}

export function isIfStatement(string: string) {
  return string.includes('if ') && string.includes(' then');
}

export function returnIfStatementVariables(ifStatement: string, separator: string = '=') {
  const leftVariable = ifStatement.split(separator)[0]?.trim().replace('elsif ', '').replace('if ', '').replace(' ', '');
  const rightVariable = ifStatement.split(separator)[1]?.trim().replace('then', '').replace(' ', '');

  return [leftVariable, rightVariable];
}

export function returnAssignmentStatementVariables(assignmentStatement: string, separator: string = '<=') {
  return assignmentStatement.split(separator).map((v) => v.trim())
}

export function isAssignmentStatement(string: string) {
  const regex = new RegExp(/.*<=.*/);
  return regex.test(string);
}

/* istanbul ignore next */
export function setReferenceIsRead(variable: string) {
  const reference = references.get(variable);

  if (reference) {
    reference.isRead = true;
  }
}

/* istanbul ignore next */
export function setReferenceIsWrite(variable: string) {
  const reference = references.get(variable);

  if (reference) {
    reference.isWrite = true;
  }
}

export function getReferenceBitSize(reference: Reference) {
  const caseStatementVariableType = reference['dataType'];
  const includesDownto = caseStatementVariableType?.toLocaleLowerCase().includes('downto');
  const includesTo = !includesDownto
    ? caseStatementVariableType?.toLocaleLowerCase().includes('to')
    : false;

  if (!includesDownto && !includesTo) {
    return null;
  }

  const cleaned = caseStatementVariableType.split('(')[1].split(')')[0];

  const [leftNumber, rightNumber] = includesDownto
    ? returnIfStatementVariables(cleaned, 'downto')
    : returnIfStatementVariables(cleaned, 'to');
  const bitCount = Math.abs(parseInt(leftNumber) - parseInt(rightNumber)) + 1;
  const combinations = Math.pow(2, bitCount);

  return combinations;
}

export function getBitSize(bitSize: string) {
  // example of bitSize: [3:0]
  const idk = bitSize.replace('[', '').replace(']', '').split(',');
  const [leftNumber, rightNumber] = idk[0].split(':');
  const bitCount = Math.abs(parseInt(leftNumber) - parseInt(rightNumber)) + 1;
  const combinations = Math.pow(2, bitCount);

  return combinations;
}

export function getProcessAlwaysBlockText(alwaysBlockTextFromAt: string, operators: string[]): string[] {
  const alwaysBlockTextFromAtWithoutBegin = alwaysBlockTextFromAt.toLocaleLowerCase()
    .replace(' begin', '')
    .replace('(', '')
    .replace(')', '');

  const regex = new RegExp(operators.join('|'), 'g');
  const parts = alwaysBlockTextFromAtWithoutBegin.split(regex);

  return parts;
}

export function updateReferenceSensitivityListVariables(reference: Reference, parts: string[]) {
  parts.forEach((part) => {
    const variables = part.split(' ').filter((variable) => variable !== '');
    const variableIndex = variables.length === 2 ? 1 : 0;
    
    if (!reference.sensitivityListVariables.includes(variables[variableIndex])) {
      reference.sensitivityListVariables.push(variables[variableIndex]);
    }
  });
}

export function getConditionExpressionVariable(condition: string) {
  return condition
    .replace('!', '')
    .replace('~', '')
    .split('==')[0]
    .trim();
}

export function getNumberOfConditions(condition: string) {
  return condition
    .split(/(and|or)/)
    .map((v) => v.trim())
    .filter((v) => v !== 'and' && v !== 'or');
}

export function isTypedefPackageItem(packageItem: any) {
  return packageItem.text.startsWith('typedef') && packageItem.text.includes('{');
}

export function isAssignmentWithBitSize(assignment: string) {
  return assignment.includes('[');
}

export function getCharactersBetween(string: string, start: string, end: string) {
  const indexOfStart = string.indexOf(start) ? string.indexOf(start) + 1 : 0;
  const indexOfEnd = string.indexOf(end) ? string.indexOf(end) : string.length;

  return string.substring(indexOfStart, indexOfEnd);
}

export function setPackageImportSize(packageItem) {
  const size = getCharactersBetween(packageItem.text, '[', ']');
  return `[${size}]`;
}

export function splitByWords(string: string) {
  return string.replace(';', '').split(' ');
}

export function isStatementComment(string: string) {
  return /^\s*--/.test(string);
}

export function getLineWithoutComments(string: string) {
  return string?.replace(/^\s+/, '');
}

export function setImportedTypes(string: string) {
  return getCharactersBetween(string, '{', '}')
    .replace(' ', '')
    .split(',');
}

export function getPackageName(string: string) {
  return string.split(' ')[1].split('::')[0];
}

export function splitConditionsByOperators(conditions: string) {
  const operators = logicalOperators.join('|') + '|' + ternalOperators.join('|');
  const regex = new RegExp(operators, 'g');

  return conditions.split(regex);
}

export function isPartOfElseIfStatement(codeLines, ifStatementContext) {
  const unparsedLine = codeLines[ifStatementContext.start.line - 1];

  return unparsedLine.includes('else if');
}
