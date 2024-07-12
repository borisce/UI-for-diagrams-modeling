import IContentWidget = monaco.editor.IContentWidget;
import IContentWidgetPosition = monaco.editor.IContentWidgetPosition;
import IPosition = monaco.IPosition;

export class RemoteCursorMonacoWidget implements IContentWidget {
  private position: IContentWidgetPosition;
  private id: string;
  private nametag: string;
  private domNode: HTMLElement;
  private nametagElement: HTMLElement;

  constructor(id: string, position: IPosition, nametag: string, color: string) {
    this.id = id;
    this.nametag = nametag;
    this.domNode = document.createElement('div');
    this.domNode.className = 'monaco-remote-cursor';
    this.domNode.style.background = color;
    this.domNode.style.height = '19px';
    this.domNode.style.pointerEvents = 'auto';

    this.nametagElement = document.createElement('div');
    this.nametagElement.className = 'monaco-remote-cursor-tooltip';
    this.nametagElement.style.background = color;
    this.nametagElement.innerHTML = this.nametag;

    this.domNode.appendChild(this.nametagElement);

    this.setPosition(position);
  }

  public getDomNode(): HTMLElement {
    return this.domNode;
  }

  public getId(): string {
    return this.id;
  }

  public setPosition(position: IPosition): void {
    this.position = {position, preference: [0]};
  }

  public getPosition(): monaco.editor.IContentWidgetPosition | null {
    return this.position;
  }

}
