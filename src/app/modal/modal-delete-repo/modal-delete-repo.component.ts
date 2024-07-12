import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Repository } from "src/app/api/models/repository";

@Component({
  selector: "app-modal-delete-repo",
  templateUrl: "./modal-delete-repo.component.html",
})
export class ModalDeleteRepoComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalDeleteRepoComponent>,
    @Inject(MAT_DIALOG_DATA) public repo: Repository
  ) {}
}