export interface ElementPosition {
  x: number;
  y: number;
}

export interface LinkPosition {
  source: string;
  target: string;
}

export class DiagramElement {
  public id: string;
  public type: string;
  public position: ElementPosition | LinkPosition;
  public attributes: any;

  constructor(id: string, type: string,
              position: ElementPosition | LinkPosition, attributes: any) {
    this.id = id;
    this.type = type;
    this.position = position;
    this.attributes = attributes;
  }
}
