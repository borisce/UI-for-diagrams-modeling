import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Repository } from 'src/app/api/models/repository';

@Component({
  selector: 'app-modal-share-repo',
  templateUrl: './modal-share-repo.component.html',
  styleUrls: ['./modal-share-repo.component.scss']
})
export class ModalShareRepoComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public repo: Repository
  ) {}

  ngOnInit(): void {
  }

}
