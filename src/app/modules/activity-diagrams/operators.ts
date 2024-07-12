// Operators for SystemVerilog
const arithmeticOperatorsSV = ['+', '-', '*', '/', '%', '**', '++', '--'];
const relationalOperatorsSV = ['<', '>', '<=', '>=', '==', '!='];
const logicalOperatorsSV = ['&&', '||', '!'];
const bitwiseOperatorsSV = ['&', '|', '^', '~', '~&', '~|', '~^'];
const shiftOperatorsSV = ['<<', '>>'];
const assignmentOperatorsSV = ['=', '<=', '+=', '-=', '*=', '/=', '%='];
const otherOperatorsSV = ['$clog2', ';'];
const loopsSV = ['for', 'while'];

const systemVerilogOperators = {
    "Arithmetic operators": arithmeticOperatorsSV,
    "Relational operators": relationalOperatorsSV,
    "Logical operators": logicalOperatorsSV,
    "Bitwise operators": bitwiseOperatorsSV,
    "Shift operators": shiftOperatorsSV,
    "Assignment operators": assignmentOperatorsSV,
    "Other operators": otherOperatorsSV,
    "Loops": loopsSV,
}

const arithmeticOperatorsVHDL = ['+', '-', '*', '/', 'mod', '**'];
const relationalOperatorsVHDL = ['<', '>', '<=', '>=', '=', '/='];
const logicalOperatorsVHDL = ['and', 'or', 'not', 'nand', 'nor', 'xor', 'xnor'];
const bitwiseOperatorsVHDL = ['and', 'or', 'xor', 'not'];
const shiftOperatorsVHDL = ['sll', 'srl', 'sla', 'sra', 'rol', 'ror'];
const assignmentOperatorsVHDL = ['<=', ':='];
const otherOperatorsVHDL = [';'];
const loopsVHDL = ['for', 'while'];

const vhdlOperators = {
    "Arithmetic operators": arithmeticOperatorsVHDL,
    "Relational operators": relationalOperatorsVHDL,
    "Logical operators": logicalOperatorsVHDL,
    "Bitwise operators": bitwiseOperatorsVHDL,
    "Shift operators": shiftOperatorsVHDL,
    "Assignment operators": assignmentOperatorsVHDL,
    "Other operators": otherOperatorsVHDL,
    "Loops": loopsVHDL,
}

export const operators = {
    "SystemVerilog": systemVerilogOperators,
    "VHDL": vhdlOperators
}




