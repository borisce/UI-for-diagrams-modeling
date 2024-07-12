import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  header: string;
  body: string;
}

@Component({
  selector: 'app-modal-confirm-settings-action',
  templateUrl: './modal-confirm-settings-action.component.html',
  styleUrls: ['./modal-confirm-settings-action.component.scss']
})
/**
 * Modal for confirmation of deleting file/ folder
 */
export class ModalConfirmSettingsActionComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmSettingsActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }
}
