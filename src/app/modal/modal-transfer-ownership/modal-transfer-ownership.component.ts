import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Repository } from "src/app/api/models/repository";

@Component({
  selector: 'app-modal-transfer-ownership',
  templateUrl: './modal-transfer-ownership.component.html',
  styleUrls: ['./modal-transfer-ownership.component.scss']
})
export class ModalTransferOwnershipComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public repo: Repository
  ) {}

  ngOnInit(): void {
  }

}
