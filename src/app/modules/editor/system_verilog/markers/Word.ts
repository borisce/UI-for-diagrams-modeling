import FindMatch = monaco.editor.FindMatch;

export class Word {
  public position: FindMatch;
  public value: string;
  public type: string;
  public isInside: boolean;

  constructor(position: FindMatch,
              value: string,
              type: string,
              isInside: boolean
  ) {
    this.position = position;
    this.value = value;
    this.type = type;
    this.isInside = isInside;
  }
}
