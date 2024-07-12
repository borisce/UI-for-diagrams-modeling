export interface VariableMetaData {
  lineNumber: number;
  column: number;
  index?: number;
  word?: string;
  previousWords?: string[];
  nextWords?: string[];
}
