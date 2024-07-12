export class Marker {
  public startLineNumber: number;
  public startColumn: number;
  public endLineNumber: number;
  public endColumn: number;
  public message: string;
  public severity: monaco.MarkerSeverity;


  constructor(startLineNumber: number,
              startColumn: number,
              endLineNumber: number,
              endColumn: number,
              message: string,
              severity: monaco.MarkerSeverity) {
    this.startLineNumber = startLineNumber;
    this.startColumn = startColumn;
    this.endLineNumber = endLineNumber;
    this.endColumn = endColumn;
    this.message = message;
    this.severity = severity;
  }
}

export enum MarkerSeverity {
  Hint = 1,
  Info = 2,
  Warning = 4,
  Error = 8
}