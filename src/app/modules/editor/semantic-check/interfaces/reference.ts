
export class Reference {
  public name: string;
  public dataType: string;
  public line: number;
  public isRead: boolean;
  public isWrite: boolean;
  public isMarked: boolean;
  public isReadOnly: boolean;
  public objectType: ObjectType;
  public typeValues: string[] = [];
  public codeBlockType: CodeBlockType;
  public codeBlockName: string;
  public sensitivityListVariables: string[] = [];
  public variablesRead: string[] = [];
  public variablesWrite: string[] = [];
  public potentialRaceConditionVariables: string[] = [];
  public size: string;
  public packageImports: PackageImport[] = [];

  constructor(name: string, dataType: string, line: number, isWrite: boolean, objectType: ObjectType, isReadOnly: boolean = false) {
    this.name = name;
    this.dataType = dataType;
    this.line = line;
    this.isRead = false;
    this.isWrite = isWrite;
    this.isMarked = false;
    this.isReadOnly = isReadOnly;
    this.objectType = objectType;
  }
}

export enum ObjectType {
  SIGNAL = 1,
  VARIABLE = 2,
  CONSTANT = 3,
  TYPE = 4,
  PROCEDURE = 5,
  PACKAGE = 6,
  PORT_IN = 7,
  PORT_OUT = 8,
  PROCESS = 9,
  ALWAYSBLOCK = 10,
  INSTANCE = 11,
  UNKNOWN = 99,
}

export enum CodeBlockType {
  PACKAGE = 1,
  LIBRARY = 2,
  ENTITY = 3,
  ARCHITECTURE = 4,
  PROCESS = 5,
  MODULE = 6,
  ALWAYSBLOCK = 7,
  INSTANCE = 8,
  UNKNOWN = 99
}

export interface PackageImport {
  variableName: string;
  importedTypes: string[];
  size?: string;
  line?: number;
  packageName?: string;
}
