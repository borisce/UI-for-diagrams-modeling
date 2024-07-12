export class VhdlGenData {
  public entityName: string;
  public architectureName: string;
  public processNumber: string;

  constructor(entityName: string, architectureName: string, processNumber: string) {
    this.entityName = entityName;
    this.architectureName = architectureName;
    this.processNumber = processNumber;
  }
}
