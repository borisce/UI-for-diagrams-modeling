import { DiagramElements } from "./diagram-elements.type";

export interface GeneratedBlock {
    name: string;
    logic: 'combinational' | 'sequential';
    statements: Array<GeneratedStatement>;
}

export interface GeneratedStatement {
    id: number;
    elementType: DiagramElements;
    text: string;
    parentId?: number; // Id of parent statement used for nested stuff - ifs etc.
    branch?: string; // Specify in which branch should the statement be placed since some parents might have multiple branches
    //isElseIf?: boolean; // Indicates if the if statement is else if -> MIGHT NEED THIS LATER
}