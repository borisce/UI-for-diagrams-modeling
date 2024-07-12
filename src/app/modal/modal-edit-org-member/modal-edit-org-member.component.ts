import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/modules/organization/org-members/org-members.component';

export interface UserData {
  firstName: String;
  lastName: String;
  permission: Role;
}

@Component({
  selector: 'app-modal-edit-org-member',
  templateUrl: './modal-edit-org-member.component.html',
  styleUrls: ['./modal-edit-org-member.component.scss']
})
export class ModalEditOrgMemberComponent implements OnInit {
  public permissionForm: UntypedFormGroup;


  constructor(private formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private dialogRef: MatDialogRef<ModalEditOrgMemberComponent>) { }

  ngOnInit(): void {
    this.permissionForm = this.formBuilder.group({
      firstName: new UntypedFormControl({ value: this.data.firstName, disabled: true }),
      lastName: new UntypedFormControl({ value: this.data.lastName, disabled: true }),
      permission: new UntypedFormControl(this.data.permission)
    });
  }

  onSubmit() {
    if (this.permissionForm.valid) {
      this.dialogRef.close(this.permissionForm.controls.permission.value);
    }
  }
}
