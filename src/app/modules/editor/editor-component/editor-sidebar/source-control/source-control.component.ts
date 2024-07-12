import { Component, OnInit } from "@angular/core";
import { GitService } from "src/app/api/collab/services/git.service";
import {
  CollabService,
  getFileNameFromDocID,
} from "src/app/core/service/collab.service";
import { RepositoryService } from "src/app/core/service/repository.service";
import { EditorTabsService } from "../../editor-tabs/service/editor-tabs.service";
import { FileCode } from "../../editor-tabs/model/file-code/file-code";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GithubService } from "src/app/core/service/github.service";
import {
  GithubRepository,
  RepoBranch,
  RepoCommit,
  RepoPull,
} from "src/app/core/model/github";
import { EditorComponentComponent } from "../../editor-component.component";
import { environment } from "src/environments/environment";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ModalRepositorySelect } from "src/app/modal/modal-repository-select/modal-repository-select.component";
import { first } from "rxjs/operators";
import { WorkspacesService } from "src/app/api/collab/services";

export interface Diff {
  id: string;
  originalFile: string;
  modifiedFile: string;
  modified: boolean;
  deleted: boolean;
  fileName: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: "source-control",
  templateUrl: "./source-control.component.html",
  styleUrls: ["./source-control.component.scss"],
})
export class SourceControlComponent implements OnInit {
  public diffFileIDs: string[] = [];
  public fileIDs: string[] = [];
  public repoMetadata: any;
  public diffs: Map<string, Diff> = new Map();
  public diffsArray: Diff[] = [];

  public calculatingDiffs: boolean = true;
  public initialLoading: boolean = true;

  public stagedChanges: Map<string, Diff> = new Map();
  public stagedArray: Diff[] = [];

  public commitForm: UntypedFormGroup;
  public submitting: boolean = false;

  public openedPanel: string | null = null;
  public commits: RepoCommit[] = [];
  public branches: RepoBranch[] = [];
  public prs: RepoPull[] = [];

  public isLocked: boolean = false;
  public isAuthenticated: boolean = false;
  public repositoriesLoading: boolean = false;

  public isFetchAndPullPopupVisible: boolean = false;
  public pulling: boolean = false;

  public isNewBranchPopupVisible: boolean = false;
  public activeBranch = localStorage.getItem("currentBranch") || "master";

  public unavailable: boolean = false;

  constructor(
    private repositoryService: RepositoryService,
    private workspacesService: WorkspacesService,
    private gitService: GitService,
    private githubService: GithubService,
    private collabService: CollabService,
    private editorTabsService: EditorTabsService,
    private formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private editorComponent: EditorComponentComponent,
    private dialog: MatDialog
  ) {
    const updateInterval = setInterval(() => {
      this.getFiles();

      if(this.unavailable) {
        clearInterval(updateInterval);
      }
    }, 5000);
  }

  public ngOnInit(): void {
    this.commitForm = this.formBuilder.group({
      message: ["", Validators.required],
    });
    if (this.githubService.isAuthenticated()) this.isAuthenticated = true;
    if (this.isRemoteRepository() && this.githubService.isAuthenticated()) {
      this.getCommits();
      this.getBranches();
      this.getPullRequests();
    } else this.isLocked = true;
  }

  public authorizeWithGithub(): void {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${environment.githubClientId}&scope=repo}`;
  }

  public fetchAndPull(): void {
    this.pulling = true;
    const token = localStorage.getItem("github_access_token");

    this.workspacesService
      .fetchAndPull({
        repoId: this.repositoryService.currentRepoUuid,
        authorization: localStorage.getItem("token"),
        body: {
          author: this.repositoryService.currentRepo.authorUUID,
          uri: this.repositoryService.currentRepo.uri,
          gitUsername: "x-oauth-basic",
          gitPassword: token,
        },
      })
      .toPromise()
      .then((response) => {
        this.editorComponent.updateFileTree();

        this.snackBar.open(
          "Successfully pulled remote repository changes.",
          "Close",
          {
            duration: 5000,
            horizontalPosition: "left",
            verticalPosition: "bottom",
          }
        );

        this.pulling = false;
      })
      .catch((reason) => {
        if (reason === "Forbidden") {
          console.error("Forbidden");
        }

        this.snackBar.open(
          reason?.error?.message ?? "Error pulling remote repository changes.",
          "Close",
          {
            duration: 5000,
            horizontalPosition: "left",
            verticalPosition: "bottom",
          }
        );

        this.pulling = false;
      });
  }

  public configureRepository(): void {
    this.repositoriesLoading = true;
    this.githubService.getRepositories().subscribe(
      (repos) => {
        this.openRepositorySelectDialog(repos);
      },
      (error: HttpErrorResponse) => {
        this.repositoriesLoading = false;

        if (error.status === 401) {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${environment.githubClientId}&scope=repo}`;
        }
      }
    );
  }

  /**
   * Event handler for clicking on create new repo button
   */
  public openRepositorySelectDialog(repos: GithubRepository[]): void {
    this.dialog
      .open(ModalRepositorySelect, {
        width: "600px",
        panelClass: "confirm-dialog-container",
        data: {
          repos,
          message:
            "Selected repository will be configured as remote repository",
        },
      })
      .afterClosed()
      .subscribe((repo: GithubRepository) => {
        if (!repo) {
          this.repositoriesLoading = false;
          return;
        }

        const newRepoObject = this.repositoryService.currentRepo;
        newRepoObject.uri = repo.html_url;

        this.repositoryService
          .updateRepo(newRepoObject.uuid, newRepoObject)
          .pipe(first())
          .subscribe(
            (data) => {
              let todaysDate = new Date();
              this.repositoryService
                .markRepoAdmin({
                  modified: true,
                  date: todaysDate,
                })
                .subscribe();

              this.repositoryService.currentRepo = newRepoObject;
              if (this.isRemoteRepository()) this.isLocked = false;

              this.repositoriesLoading = false;
            },
            (error) => {
              this.repositoriesLoading = false;
            }
          );
      });
  }

  public getFiles() {
    const metadata = this.collabService.getRepoMetadataDoc(
      this.repositoryService.currentRepoUuid
    );
    metadata.fetch((err) => {
      if (err) return console.error(err);

      if (metadata.data) {
        this.repoMetadata = metadata;

        const branch = localStorage.getItem("currentBranch") || "master";

        this.fileIDs = this.repoMetadata.data.files[branch];
        if(this.repoMetadata.data?.diff_files) {
          this.diffFileIDs = this.repoMetadata.data?.diff_files[branch]
        } else {
          this.diffFileIDs = []
          this.unavailable = true;
        }
      }

      this.calculateDiffs();
    });
  }

  public async calculateDiffs() {
    this.calculatingDiffs = true;

    const newDiffs = new Map<string, Diff>();
    const newStaged = new Map<string, Diff>();

    const deletedFiles = this?.diffFileIDs?.filter(
      (fileID) => !this.fileIDs.includes(fileID)
    );

    await Promise.all(
      [...this.fileIDs, ...deletedFiles].map(async (fileID) => {
        const isDeleted = deletedFiles.includes(fileID);

        let diffFile;
        const file = !isDeleted
          ? await this.collabService.getDocContents(fileID, "files")
          : "";
        if (this.diffFileIDs?.includes(fileID))
          diffFile = await this.collabService.getDocContents(
            fileID,
            "diff_files"
          );

        if (file !== diffFile) {
          if (this.stagedChanges.has(fileID)) {
            newStaged.set(fileID, {
              id: fileID,
              originalFile: diffFile ? diffFile : "",
              modifiedFile: file,
              modified: diffFile ? true : false,
              deleted: isDeleted,
              fileName: getFileNameFromDocID(fileID),
            });
          } else {
            newDiffs.set(fileID, {
              id: fileID,
              originalFile: diffFile ? diffFile : "",
              modifiedFile: file,
              modified: diffFile && !isDeleted ? true : false,
              deleted: isDeleted,
              fileName: getFileNameFromDocID(fileID),
            });
          }
        }
      })
    );

    this.diffs = newDiffs;
    this.diffsArray = Array.from(this.diffs.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
    this.stagedChanges = newStaged;
    this.stagedArray = Array.from(this.stagedChanges.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
    this.calculatingDiffs = false;

    if (this.initialLoading) this.initialLoading = false;
  }

  public showDiff(fileID: string, staged: boolean = false) {
    const file = staged
      ? this.stagedChanges.get(fileID)
      : this.diffs.get(fileID);

    this.collabService.setDiffMode(
      true,
      {
        code: file.originalFile,
        language: "text/plain",
      },
      {
        code: file.modifiedFile,
        language: "text/plain",
      }
    );
    this.editorTabsService.addTab(
      new FileCode(file.fileName, "diff", "", true)
    );
  }

  public addToStaged(diff: Diff) {
    this.stagedChanges.set(diff.id, diff);
    this.stagedArray = Array.from(this.stagedChanges.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
    this.diffs.delete(diff.id);
    this.diffsArray = Array.from(this.diffs.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
  }

  public stageAllChanges() {
    this.diffs.forEach((diff) => {
      this.stagedChanges.set(diff.id, diff);
    });
    this.stagedArray = Array.from(this.stagedChanges.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
    this.diffs.clear();
    this.diffsArray = Array.from(this.diffs.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
  }

  public removeFromStaged(diff: Diff) {
    this.diffs.set(diff.id, diff);
    this.diffsArray = Array.from(this.diffs.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
    this.stagedChanges.delete(diff.id);
    this.stagedArray = Array.from(this.stagedChanges.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
  }

  public unstageAllChanges() {
    this.stagedChanges.forEach((diff) => {
      this.diffs.set(diff.id, diff);
    });
    this.diffsArray = Array.from(this.diffs.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
    this.stagedChanges.clear();
    this.stagedArray = Array.from(this.stagedChanges.values()).sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
  }

  get f(): any {
    return this.commitForm.controls;
  }

  public commit(): void {
    this.submitting = true;

    const branch = localStorage.getItem("currentBranch") || "master";

    this.gitService
      .gitRepoIdCommitPost({
        repoId: this.repositoryService.currentRepoUuid,
        authorization: localStorage.getItem("token"),
        body: {
          branch,
          files: this.stagedArray.map((diff) => ({
            id: diff.id,
            deleted: diff.deleted,
          })),
          message: this.f.message.value,
          github_token: localStorage.getItem("github_access_token"),
        },
      })
      .toPromise()
      .then((result) => {
        if (result.code === "CommitSuccess") {
          this.snackBar
            .open("Successfully commited", "See commit", {
              duration: 5000,
              horizontalPosition: "left",
              verticalPosition: "bottom",
            })
            .onAction()
            .subscribe(() => {
              // TODO: Open commit on github
              console.log("TODO: Github commit");
            });
        }

        this.getFiles();
        this.commitForm.reset();
        this.submitting = false;
      })
      .catch((e) => {
        if (e.status === 401 && e.error.code === "GithubTokenRequired") {
          this.snackBar
            .open("You are not authorized with GitHub", "Authorize", {
              duration: 5000,
              horizontalPosition: "left",
              verticalPosition: "bottom",
            })
            .onAction()
            .subscribe(() => {
              // TODO: Open github auth page
              console.log("TODO: Github auth");
            });
        }
        console.log(e);
        if (e.status === 403 && e.error.includes("denied")) {
          this.snackBar
            .open(
              "You don't have an acces to this repository, please check ASICDE installation permissions to this repository.",
              "Open installation",
              {
                duration: 5000,
                horizontalPosition: "left",
                verticalPosition: "bottom",
              }
            )
            .onAction()
            .subscribe(() => {
              window.location.href = `https://github.com/login/oauth/authorize?client_id=${environment.githubClientId}&scope=repo}`;
            });
        }

        console.error(e);

        this.submitting = false;
      });
  }

  public openPanel(panel: string): void {
    this.openedPanel = this.openedPanel === panel ? null : panel;
  }

  public getCommits() {
    // TODO: better way to get author and repo name
    const owner = this.repositoryService.currentRepo?.uri.split("/")[3];
    const repo = this.repositoryService.currentRepo?.uri.split("/")[4];

    if (!this.isRemoteRepository()) return;
    this.githubService.getCommits(owner, repo).subscribe((commits) => {
      this.commits = commits;
    });
  }

  public getBranches() {
    // TODO: better way to get author and repo name
    const owner = this.repositoryService.currentRepo.uri.split("/")[3];
    const repo = this.repositoryService.currentRepo.uri.split("/")[4];

    if (!this.isRemoteRepository()) return;
    this.githubService.getBranches(owner, repo).subscribe((branches) => {
      this.branches = branches;
    });
  }

  public getPullRequests() {
    // TODO: better way to get author and repo name
    const owner = this.repositoryService.currentRepo.uri.split("/")[3];
    const repo = this.repositoryService.currentRepo.uri.split("/")[4];

    if (!this.isRemoteRepository()) return;
    this.githubService.getPullRequests(owner, repo).subscribe((prs) => {
      this.prs = prs;
    });
  }

  public discardChanges(diffID: string) {
    const doc = this.collabService.getDocument(diffID, "files");
    const diffDoc = this.collabService.getDocument(diffID, "diff_files");

    diffDoc.fetch((err) => {
      if (diffDoc.type !== null) {
        doc.fetch((err) => {
          if (doc.type !== null) {
            doc.submitOp([{ d: doc.data }, diffDoc.data]);
            this.calculateDiffs();
          }
        });
      }
    });
  }

  public discardAllChanges() {
    this.diffs.forEach((diff) => {
      this.discardChanges(diff.id);
    });
    this.calculateDiffs();
  }

  public isRemoteRepository(): boolean {
    const user = this.repositoryService.currentRepo?.uri.split("/")[3];
    const repo = this.repositoryService.currentRepo?.uri.split("/")[4];

    if (!user || !repo) return false;
    return true;
  }

  public checkoutNewBranch(currentBranch: string, newBranch: string): void {
    this.githubService
      .checkoutNewBranch(currentBranch, newBranch)
      .then((response) => {
        this.snackBar.open(
          `Branch ${newBranch} succesfully created.`,
          "Close",
          {
            duration: 5000,
            horizontalPosition: "left",
            verticalPosition: "bottom",
          }
        );

        this.editorComponent.myGit = newBranch;
        localStorage.setItem("currentBranch", newBranch);
        this.activeBranch = newBranch;
        this.getBranches();
      })
      .catch((err) => {
        this.snackBar.open(
          err?.error?.message ?? "Error checking out branch.",
          "Close",
          {
            duration: 5000,
            horizontalPosition: "left",
            verticalPosition: "bottom",
          }
        );
        console.error(err);
      });
  }

  public openNewBranchModal(): void {
    this.isNewBranchPopupVisible = true;
  }

  public onCloseCodeReviewPopup(): void {
    this.isNewBranchPopupVisible = false;
  }

  public onCreateBranch(newBranch: string): void {
    if (newBranch === "" || newBranch === null) return;

    this.checkoutNewBranch(
      localStorage.getItem("currentBranch") || "master",
      newBranch
    );
    this.isNewBranchPopupVisible = false;
  }

  public openFetchAndPullPopup(): void {
    this.isFetchAndPullPopupVisible = true;
  }

  public onCloseFetchAndPullPopup(): void {
    this.isFetchAndPullPopupVisible = false;
  }

  public onFetchAndPull(): void {
    this.fetchAndPull();
    this.isNewBranchPopupVisible = false;
  }
}

export const calculateDiffs = async (
  fileIDs: string[],
  diffFileIDs: string[],
  collabService: CollabService
) => {
  const deletedFiles = diffFileIDs?.filter(
    (fileID) => !fileIDs.includes(fileID)
  );

  const promises = [...fileIDs, ...deletedFiles].map(async (fileID) => {
    const isDeleted = deletedFiles.includes(fileID);

    let diffFile;
    const file = !isDeleted
      ? await collabService.getDocContents(fileID, "files")
      : "";

    if (diffFileIDs.includes(fileID)) {
      diffFile = await collabService.getDocContents(fileID, "diff_files");
    }

    if (file !== diffFile) {
      return {
        id: fileID,
        originalFile: diffFile ? diffFile : "",
        modifiedFile: file,
        modified: diffFile ? true : false,
        deleted: isDeleted,
        fileName: getFileNameFromDocID(fileID),
      };
    }

    return null;
  });

  const results = await Promise.all(promises);

  const newDiffs = new Map<string, Diff>();

  results.forEach((result) => {
    if (result) newDiffs.set(result.id, result);
  });

  return newDiffs;
};
