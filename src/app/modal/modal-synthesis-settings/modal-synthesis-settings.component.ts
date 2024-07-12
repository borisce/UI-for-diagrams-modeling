import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditorTabsComponent } from 'src/app/modules/editor/editor-component/editor-tabs/component/editor-tabs.component';

@Component({
  selector: 'app-modal-synthesis-settings',
  templateUrl: './modal-synthesis-settings.component.html',
  styleUrls: ['./modal-synthesis-settings.component.scss']
})
export class ModalSynthesisSettings implements OnInit {
  public steps: Array<any>;
  public endStep: string;
  public technologies: Array<any>;
  public technology: string;
  public f: { [p: string]: AbstractControl };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalSynthesisSettings>,
    @Inject(MAT_DIALOG_DATA) public data: SynthesisSettingsModel) {
    this.steps = [
      { value: 'syn', text: 'Syn' },
      { value: 'place', text: 'Place' },
      { value: 'sta', text: 'STA' },
      { value: 'route', text: 'Route' },
      { value: 'backanno', text: 'Post STA' },
    ];
    this.technologies = [
      { value: 'osu018', text: 'osu018' },
      { value: 'osu035', text: 'osu035' },
      { value: 'osu050', text: 'osu050' },
    ];
  }

  public ngOnInit(): void {
    this.setEndStep(0);
    this.technology = this.technologies[0].value;
  }

  public onClickRun(): void {
    this.data.editorTabs.onSynthesisStart(this.endStep, this.technology);
    this.dialogRef.close();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public setEndStep(index) {
    this.endStep = this.steps[index].value;
  }
}

export class SynthesisSettingsModel {
  constructor(
    public editorTabs: EditorTabsComponent,
  ) { }
}
