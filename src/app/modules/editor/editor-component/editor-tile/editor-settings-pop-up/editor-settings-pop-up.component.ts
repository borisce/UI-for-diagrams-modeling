import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input  } from '@angular/core';

@Component({
  selector: 'app-editor-settings-pop-up',
  templateUrl: './editor-settings-pop-up.component.html',
  styleUrls: ['./editor-settings-pop-up.component.css']
})
export class EditorSettingsPopUpComponent implements OnInit {

  @Input() isOpen:boolean = false;
  @Input() minLen: number = 1;
  @Input() maxNumberPredictions: number = 1;
  @Input() showSnippets: boolean = false;
  @Output() onSave = new EventEmitter<{ minLen: number, maxNumberPredictions: number,showSnippets: boolean }>();
  @Output() onClose = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  save() {
    this.onSave.emit({ minLen: this.minLen, maxNumberPredictions: this.maxNumberPredictions, showSnippets: this.showSnippets });
    this.close();
  }

  close() {
    this.onClose.emit();
  }
}
