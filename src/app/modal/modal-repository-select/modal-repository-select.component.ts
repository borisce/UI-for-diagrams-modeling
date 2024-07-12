import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GithubRepository } from "src/app/core/model/github";

export interface RepositorySelectModalData {
  repos: GithubRepository[];
  message?: string;
  theme?: string;
}

@Component({
  selector: "app-modal",
  templateUrl: "./modal.repository-select.component.html",
  styleUrls: ["./modal.repository-select.component.scss"],
})
/**
 * Modal for selecting repository to import.
 */
export class ModalRepositorySelect implements OnInit {
  public repos: GithubRepository[] = [];
  public selectedRepo: GithubRepository | undefined;

  public message: string | undefined = undefined;
  public theme: string | undefined = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RepositorySelectModalData,
    public dialogRef: MatDialogRef<ModalRepositorySelect>
  ) {
    this.repos = data.repos;
    this.message = data.message;
    this.theme = data.theme;
  }

  public ngOnInit(): void {}

  public selectRepo(repo: GithubRepository): void {
    this.selectedRepo = repo;
  }

  public confirmSelection(): void {
    this.dialogRef.close(this.selectedRepo);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
