import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalGitCredentialsDataModel } from '../modal-git-credentials-data-model';

@Component({
  selector: 'app-modal-put-credentials',
  templateUrl: './modal-put-credentials.component.html'
})
/**
 * Modal for putting credentials for git push
 */
export class ModalPutCredentialsComponent implements OnInit {
  public repoEditForm: UntypedFormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public returnUrl: string;
  public name: string;
  public password: string;
  public error: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalPutCredentialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalGitCredentialsDataModel
  ) {
  }

  /**
   * Closing modal.
   */
  public onNoClick(): void {
    this.dialogRef.close([null, null]);
  }

  /**
   * Better access to form variables
   */
  get f(): any {
    return this.repoEditForm.controls;
  }

  /**
   * Creating form for credentials.
   */
  public ngOnInit(): void {
    this.repoEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Returning credentials after confirmation.
   */
  public onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    if (this.repoEditForm.invalid) {
      this.loading = false;
      return;
    }
    this.data.gitCredentialsRequiredFunc(this.f.name.value, this.f.password.value).then(() => {
      this.loading = false;
      this.error = undefined;
      this.dialogRef.close([this.f.name.value, this.f.password.value]);
    }).catch(reason => {
      this.loading = false;
      if (reason === 'Forbidden') {
        this.error = 'Invalid credentials';
      } else {
        this.error = reason;
      }
    });
  }
}

