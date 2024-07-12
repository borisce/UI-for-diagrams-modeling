import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-set-message',
  templateUrl: './modal-set-message.component.html'
})
/**
 * Modal for setting commit message
 */
export class ModalSetMessageComponent implements OnInit {
  public repoEditForm: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalSetMessageComponent>
  ) {
  }

  /**
   * Better access to form variables.
   */
  get f(): any {
    return this.repoEditForm.controls;
  }

  /**
   * Setting form information.
   */
  public ngOnInit(): void {
    this.repoEditForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }

  /**
   * Returning commit message after confirmation.
   */
  public onSubmit(): any {
    this.submitted = true;
    if (this.repoEditForm.invalid) {
      return;
    }
    this.dialogRef.close(this.f.message.value);
  }
}
