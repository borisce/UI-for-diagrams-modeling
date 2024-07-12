import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';
import { JointJSPaper } from '../classes/JointJSPaper';
import * as joint from 'jointjs';

@Component({
  selector: 'app-subdiagram-paper-component',
  templateUrl: './subdiagram-paper-component.component.html',
  styleUrls: ['./subdiagram-paper-component.component.scss']
})
export class SubdiagramPaperComponent implements OnInit {

  private diagramGraph;
  private paper;

  @ViewChild('windowReference') public window: jqxWindowComponent;
  @ViewChild('jqxWidget') public jqxWidget: ElementRef;
  @ViewChild('events') public events: jqxPanelComponent;

  constructor(private jointJSPaper: JointJSPaper) {
  }

  public ngOnInit() {
  }

  public ngAfterViewInit(): void {
    const offsetLeft = this.jqxWidget.nativeElement.offsetLeft;
    const offsetTop = this.jqxWidget.nativeElement.offsetTop;
    this.window.position({ x: offsetLeft + 50, y: offsetTop + 50 });
    this.window.focus();
    this.window.hide();


    this.diagramGraph = new joint.dia.Graph;

    const diagramPaper = document.createElement('div');
    diagramPaper.setAttribute('id', 'diagramPaper');
    diagramPaper.style.margin = 'auto';
    diagramPaper.style.cssFloat = 'left';
    diagramPaper.style.borderStyle = 'solid';
    diagramPaper.style.borderWidth = '5px';
    diagramPaper.style.overflow = 'scroll';
    document.getElementById('windowContent').appendChild(diagramPaper);
  }
  public onResizeCheckBox(event: any): void {
    if (event.args.checked) {
      this.window.resizable(true);
    } else {
      this.window.resizable(false);
    }
  }
  public onDragCheckBox(event: any): void {
    if (event.args.checked) {
      this.window.draggable(true);
    } else {
      this.window.draggable(false);
    }
  }
  public onShowButton(): void {
    this.window.open();
  }
  public onHideButton(): void {
    this.window.close();
  }
  public subdiagramWindowResize(e) {
    this.paper.setDimensions(e.args.width - 20, e.args.height - 50);
  }

}
