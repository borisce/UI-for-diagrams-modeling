import { MatTableDataSource } from "@angular/material/table";
import { InputOutput, InternalSignal, Parameter } from "./data-source.type";
import * as joint from 'jointjs';

export interface DiagramData {
    moduleName: string,
    blocks: Array<Block>,
    moduleInputs: MatTableDataSource<InputOutput>,
    moduleOutputs: MatTableDataSource<InputOutput>,
    internalSignals: MatTableDataSource<InternalSignal>,
    parameters: MatTableDataSource<Parameter>,
}

export interface Block {
    name: string,
    logic: 'combinational' | 'sequential',
    sensitivityList?: {
        clockSignal: string,
        clockEdge: 'rising' | 'falling',
        resetSignal: string,
        resetType: 'sync' | 'async',
        resetValue: 'active-1' | 'active-0',
    }
    graph: joint.dia.Graph,
    linkLabels: Array<{ id: joint.dia.Cell.ID, label: string }>,
}