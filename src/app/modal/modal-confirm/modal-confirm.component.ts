import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
/**
 * Modal for confirmation of deleting file/ folder
 */
export class ModalConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
  }

  public closeDialog(): void {
    this.dialogRef.close(false);
  }
}

class ConfirmDialogModel {
  constructor(public message: string) {
  }
}
