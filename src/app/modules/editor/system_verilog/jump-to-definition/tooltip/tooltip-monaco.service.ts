import { Injectable } from '@angular/core';
import { TooltipType } from './model/tooltip-type.enum';
import IStandEditor = monaco.editor.IStandaloneCodeEditor;
import IContentWidget = monaco.editor.IContentWidget;
import IContentWidgetPosition = monaco.editor.IContentWidgetPosition;
import IPosition = monaco.IPosition;

@Injectable({
  providedIn: 'root'
})
export class TooltipMonacoService {
  private actualTooltip: IContentWidget;

  constructor() {
  }

  private static createTooltipNode(text: string, widgetType: TooltipType): HTMLElement {
    let widget: HTMLElement;
    widget = document.createElement('div');
    widget.classList.add('tooltip-monaco');
    if (widgetType !== TooltipType.neutral) {
      widget.classList.add(TooltipType[widgetType] + '-tooltip-monaco');
    }
    widget.appendChild(TooltipMonacoService.createTooltipInner(text));
    return widget;
  }

  private static createTooltipInner(text: string): HTMLElement {
    const inner: HTMLElement = document.createElement('div');
    inner.classList.add('inner');
    inner.innerHTML = text;
    return inner;
  }

  public createTooltip(editor: IStandEditor, text: string, type: TooltipType): IContentWidget {
    const clickedPosition: monaco.Position = editor.getPosition();
    const widgetPosition: IContentWidgetPosition = this.widgetPosition(clickedPosition);
    const contentWidget: IContentWidget = {
      getId: this.widgetId,
      getDomNode: () => {
        return TooltipMonacoService.createTooltipNode(text, type);
      },
      getPosition: () => {
        return widgetPosition;
      }
    };
    if (this.actualTooltip) {
      editor.removeContentWidget(this.actualTooltip);
    }
    editor.addContentWidget(contentWidget);
    this.closeAfter(editor, 2).then();
    this.actualTooltip = contentWidget;
    return contentWidget;
  }

  public async closeAfter(editor: IStandEditor, durationSeconds: number): Promise<void> {
    await this.delay(durationSeconds * 1000);
    editor.removeContentWidget(this.actualTooltip);
  }

  public delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public widgetPosition(position: IPosition): IContentWidgetPosition {
    return {
      position,
      preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE,
        monaco.editor.ContentWidgetPositionPreference.BELOW]
    };
  }

  public widgetId(): string {
    return 'tooltip';
  }
}
