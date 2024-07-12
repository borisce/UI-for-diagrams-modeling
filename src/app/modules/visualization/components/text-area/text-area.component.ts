import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SourceCode } from '../classes/sourceCode';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @Output() public moduleCodeSubmitted = new EventEmitter<SourceCode>();

  constructor() { }

  public ngOnInit() {
    const modal = document.getElementById('sourceCodeTextAreaBackground');
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }


  public showCode(sourceCode) {
    const textarea = document.getElementById('sourceCodeTextAreaBackground');
    $('#sourceCodeTextarea').val(sourceCode);
    textarea.style.display = 'block';
  }

  public showCodeToLoad() {
    const textarea = document.getElementById('sourceCodeTextAreaSubmitBackground');
    textarea.style.display = 'block';
  }

  public onCodeCancelClicked() {
    const textarea = document.getElementById('sourceCodeTextAreaSubmitBackground');
    textarea.style.display = 'none';
  }
}
