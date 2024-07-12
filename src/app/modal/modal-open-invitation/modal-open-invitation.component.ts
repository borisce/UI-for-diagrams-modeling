import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Invitation } from 'src/app/api/models/invitation';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal-open-invitation',
  templateUrl: './modal-open-invitation.component.html',
  styleUrls: ['./modal-open-invitation.component.scss'],
})
export class ModalOpenInvitationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalOpenInvitationComponent>,
    private dialog: MatDialog,
    ) {
    }

  ngOnInit(): void {
  }

}
