import {getFileNameFromDocID} from '../../../../core/service/collab.service';

export class Module {
  public readonly id: string;
  public readonly docId?: string;
  public readonly name: string;
  public readonly instance: string;
  public readonly position: {
    x: number,
    y: number
  };

  constructor(module: {
    id: string,
    name: string,
    docId?: string,
    instance: string,
    position:
      { x: number, y: number }
  }) {
    this.id = module.id;
    this.name = module.name;
    if (module.docId) {
      this.name = getFileNameFromDocID(module.docId);
      this.name = this.name.substring(0, this.name.lastIndexOf('.'));
      this.docId = module.docId;
    }
    this.instance = module.instance;
    this.position = module.position;
  }

  public get displayName(): string {
    return this.name.substring(0, this.name.lastIndexOf('.'));
  }
}
