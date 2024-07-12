import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-file-name',
  templateUrl: './modal-file-name.component.html'
})
export class ModalFileNameComponent implements OnInit {
  public name: string;
  public fileNameForm: UntypedFormGroup;
  public loading: boolean;
  public submitted: boolean;
  public f: { [p: string]: AbstractControl };

  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalFileNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileDialogModel) {
    this.fileNameForm = fb.group({
      name: [data.name, [Validators.required, data.validator]]
    });
    this.fileNameForm.controls['name'].valueChanges.subscribe(value => {
      this.fileNameForm.patchValue({name: value.replace(/\s+/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}, {emitEvent: false});
    });

    this.f = this.fileNameForm.controls;
  }

  public ngOnInit(): void {
  }

  public extension(name: string): string {
    if (this.data.showAddedExtension) {
      if (name.includes('.')) {
        return '';
      }
      return '.sv';
    }
    return '';
  }

  public onSubmit(): void {
    if (!this.fileNameForm.invalid) {
      this.dialogRef.close(this.f.name.value);
    } else {
      console.warn('Form invalid', this.f);
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}

export class FileDialogModel {
  constructor(
    public name: string,
    public title: string,
    public message: string,
    public path: string,
    public validator: (control: AbstractControl) => any,
    public showAddedExtension: boolean) {
  }
}
