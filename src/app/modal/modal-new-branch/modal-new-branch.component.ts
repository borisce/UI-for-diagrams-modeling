import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-new-branch',
  templateUrl: './modal-new-branch.component.html'
})
export class ModalNewBranchComponent implements OnInit {
  public repoEditForm: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalNewBranchComponent>
  ) {
  }

  get f() {
    return this.repoEditForm.controls;
  }

  public ngOnInit() {
    this.repoEditForm = this.formBuilder.group({
      newBranch: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.repoEditForm.invalid) {
      return;
    }
    this.dialogRef.close(this.f.newBranch.value);
  }
}
