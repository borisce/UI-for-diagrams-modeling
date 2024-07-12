import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface EditTeamNameDialogData {
  teamName: string;
}

@Component({
  selector: 'app-modal-edit-team-name',
  templateUrl: './modal-edit-team-name.component.html',
  styleUrls: ['./modal-edit-team-name.component.scss']
})
export class ModalEditTeamNameComponent implements OnInit {
  public teamRenameForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<ModalEditTeamNameComponent>,
    @Inject(MAT_DIALOG_DATA) private data: EditTeamNameDialogData) { }

  ngOnInit(): void {
    this.teamRenameForm = this.formBuilder.group({
      teamName: [this.data.teamName, Validators.required]
    })
  }

  onSubmit() {
    if (this.teamRenameForm.valid) {
      this.dialogRef.close(this.teamRenameForm.controls.teamName.value);
    }
  }
}
