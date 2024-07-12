import { MatTableDataSource } from "@angular/material/table";

export enum InputOutputType {
    logic = 'logic',
    wire = 'wire',
    reg = 'reg',
    std_logic = 'std_logic',
    std_logic_vector = 'std_logic_vector'
}
export interface InputOutput {
    name: string;
    type: InputOutputType;
    bits: string;
}

export enum InternalSignalType {
    logic = 'logic',
    integer = 'integer',
    reg = 'reg',
    time = 'time',
    real = 'real',
    std_logic = 'std_logic',
    std_logic_vector = 'std_logic_vector'
}
export interface InternalSignal {
    name: string;
    type: InternalSignalType
    bits: string;
    // value: string;
}

export enum ParameterType {
    integer = 'integer',
    real = 'real',
    time = 'time'
}
export interface Parameter {
    name: string;
    type: ParameterType;
    value: string;
}

export interface ActiveTable {
    name: 'inputs' | 'outputs' | 'signals' | 'parameters';
    tableData: MatTableDataSource<InputOutput | InternalSignal | Parameter>;
}