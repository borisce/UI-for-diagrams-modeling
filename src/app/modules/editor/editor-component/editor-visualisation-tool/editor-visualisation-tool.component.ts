import { Component, Input, OnInit } from '@angular/core';
import { EditorComponentComponent } from '../editor-component.component';
import { EditorTabsService } from '../editor-tabs/service/editor-tabs.service';

@Component({
  selector: 'app-editor-visualisation-tool',
  templateUrl: './editor-visualisation-tool.component.html',
  styleUrls: ['./editor-visualisation-tool.component.scss']
})
export class EditorVisualisationToolComponent implements OnInit {
  @Input() public context: EditorComponentComponent;

  public loadedWaveform: boolean = false;
  public maximized: boolean = false;
  private iframe: HTMLElement;
  private iWindow: Window;
  protected helpOpened: boolean = false;

  constructor(
    private editorTabsService: EditorTabsService
  ) {
  }

  public ngOnInit(): void {
    this.iframe = document.getElementById('waveformTool');
    this.iWindow = (this.iframe as HTMLIFrameElement).contentWindow as Window;
    if (this.editorTabsService.onOpenVCD.getValue() !== '') {
      this.loadVCD(this.editorTabsService.onOpenVCD.getValue());
    }

    this.editorTabsService.onOpenVCD.subscribe(content => this.loadVCD(content));
  }


  public loadVCD(content: string): void {
    if (this.loadedWaveform) {
      this.reloadWaveformViewer(() => {
        this.openFile(content);
      });
    } else {
      this.openFile(content);
    }
  }

  private openFile(content: string): void {
    this.iWindow.dispatchEvent(new CustomEvent('openFile', {
      detail: {
        content
      }
    }));
    this.maximized = false;
    this.loadedWaveform = true;
  }

  private reloadWaveformViewer(callback: () => void): void {
    this.maximized = false;
    this.loadedWaveform = false;
    this.iframe.onload = () => {
      setTimeout(callback, 50);
    };
    this.iWindow.location.reload();
  }
}

