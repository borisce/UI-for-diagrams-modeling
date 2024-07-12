export class SystemVerilogGenData {

  public moduleName: string;
  public stateEncoding: string;
  public hammingDistance?: number;
  public alwaysBlocksNumber: string;
  public language: string;

  constructor(moduleName: string, stateEncoding: string, alwaysBlocksNumber: string,
              language: string, hammingDistance?: number) {
    this.moduleName = moduleName;
    this.stateEncoding = stateEncoding;
    this.alwaysBlocksNumber = alwaysBlocksNumber;
    this.language = language;
    this.hammingDistance = hammingDistance;
  }
}
