import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalGitCredentialsDataModel } from '../modal-git-credentials-data-model';

@Component({
  selector: 'app-modal-commit-push',
  templateUrl: './modal-commit-push.component.html'
})
export class ModalCommitPushComponent implements OnInit {

  public repoEditForm: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;
  public error: string;
  public loading: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalCommitPushComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalGitCredentialsDataModel
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
      message: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Returning commit message and push credentials after confirmation.
   */
  public onSubmit(): any {
    this.submitted = true;
    this.loading = true;
    if (this.repoEditForm.invalid) {
      this.loading = false;
      return;
    }
    this.data.gitCredentialsRequiredFunc(this.f.name.value,
      this.f.password.value, this.f.message.value).then(value => {
        this.dialogRef.close(value);
        this.loading = false;
      }).catch(reason => {
        this.error = reason;
        this.loading = false;
      });
  }
}
