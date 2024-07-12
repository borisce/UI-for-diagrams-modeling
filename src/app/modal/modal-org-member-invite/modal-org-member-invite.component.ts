import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-org-member-invite',
  templateUrl: './modal-org-member-invite.component.html',
  styleUrls: ['./modal-org-member-invite.component.scss']
})
export class ModalOrgMemberInviteComponent implements OnInit {
  public inviteForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private dialogRef: MatDialogRef<ModalOrgMemberInviteComponent>) { }

  ngOnInit(): void {
    this.inviteForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  onSubmit() {
    if (this.inviteForm.valid) {
      this.dialogRef.close(this.inviteForm.controls.email.value);
    }
  }
}
