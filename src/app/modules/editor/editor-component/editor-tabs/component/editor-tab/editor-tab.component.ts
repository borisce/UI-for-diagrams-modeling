import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { EditorTabsService } from '../../service/editor-tabs.service';
import { Tab } from '../../model/tab/tab';

@Component({
  selector: 'app-editor-tab',
  templateUrl: './editor-tab.component.html',
  styleUrls: ['./editor-tab.component.scss'],
})
export class EditorTabComponent implements OnInit, AfterViewInit {
  @Input() tab: Tab;

  constructor(public editorTabsService: EditorTabsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  codeOpen(): void {
    this.editorTabsService.openCode(this.tab.id);
  }

  closeTab() {
    this.editorTabsService.closeTab(this.tab.id);

  }
}
