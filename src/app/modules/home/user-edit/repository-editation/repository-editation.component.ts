import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RepositoryService } from '../../../../core/service/repository.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesService } from '../../../../core/fileSystem/Filer/files.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDeleteRepoComponent } from "src/app/modal/modal-delete-repo/modal-delete-repo.component";
import { AuthenticationService } from '../../../../core/service';
import {
  ModalTransferOwnershipComponent
} from 'src/app/modal/modal-transfer-ownership/modal-transfer-ownership.component';
import { ModalShareRepoComponent } from 'src/app/modal/modal-share-repo/modal-share-repo.component';

@Component({
  selector: 'app-repository-editation',
  templateUrl: './repository-editation.component.html',
  styleUrls: ['./repository-editation.component.scss']
})

export class RepositoryEditationComponent implements OnInit {
  public newRepoName = new UntypedFormControl(this.getRepoName() ?? '');
  public newRepoUrl = new UntypedFormControl(this.getRepoUri() ?? '');
  public editRepForm: UntypedFormGroup;
  public editURLForm: UntypedFormGroup;
  public editForm: UntypedFormGroup;
  public name: string;
  public returnUrl: string;
  public submitted: boolean = false;
  public loading: any = false;

  constructor(public dialog: MatDialog,
    public authenticationService: AuthenticationService,
    public repoService: RepositoryService,
    public fileService: FilesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/editUser/repository';
  }

  get isUrlInvalid(): boolean {
    return this.newRepoUrl.hasError('pattern');
  }

  public ngOnInit(): void {
    this.editRepForm = this.formBuilder.group({
      name: [],
    });
    this.editURLForm = this.formBuilder.group({
      returnUrl: ['', Validators.required]
    });
    this.editForm = this.formBuilder.group({});
  }

  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  public getRepoName(): any {
    return this.repoService.currentRepo != null ? this.repoService.currentRepo.name : null;
  }

  public getRepoUri(): any {
    return this.repoService.currentRepo != null ? this.repoService.currentRepo.uri : null;
  }

  public changeRepositoryName(): void {
    this.loading = true;

    const newRepo = this.repoService.currentRepo;
    newRepo.name = this.newRepoName.value;

    this.repoService.updateRepo(newRepo.uuid, newRepo).pipe(first())
      .subscribe(
        data => {
          let todaysDate = new Date();
          this.repoService.markRepoAdmin({
            "modified": true,
            "date": todaysDate
          }).subscribe();

          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  public changeRepositoryUrl(): void {
    this.loading = true;

    const newRepo = this.repoService.currentRepo;
    newRepo.uri = this.newRepoUrl.value;

    this.repoService.updateRepo(newRepo.uuid, newRepo).pipe(first())
      .subscribe(
        data => {
          let todaysDate = new Date();
          this.repoService.markRepoAdmin({
            "modified": true,
            "date": todaysDate
          }).subscribe();

          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  public openDeleteDialog(): void {
    const dialogRef: any = this.dialog.open(ModalDeleteRepoComponent, {
      width: '450px',
      data: { ...this.repoService.currentRepo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.repoService.deleteRepo(this.repoService.currentRepo.uuid).pipe(first())
          .subscribe(
            res => {
              let todaysDate = new Date();
              this.repoService.markRepoAdmin({
                "deleted": true,
                "date": todaysDate
              }).subscribe();
              indexedDB.deleteDatabase(this.repoService.currentRepo.uuid);
              dialogRef.close();
              localStorage.removeItem('currentRepo');
              this.repoService.getRepos(this.authenticationService.currentUser.username);
            },
            error => {
            });

        if (this.router.url.substring(this.router.url.length - 11, this.router.url.length) === '/repository') {
          this.router.navigate(['/my-repos']);
        }
      } else this.repoService.getRepos(this.authenticationService.currentUser.username);
    });

  }

  public openTransferOwnershipDialog(): void {
    const dialog: any = this.dialog.open(ModalTransferOwnershipComponent, {
      data: { ...this.repoService.currentRepo }
    });
  }

  public openShareRepoDialog(): void {
    const dialog: any = this.dialog.open(ModalShareRepoComponent, {
      data: { ...this.repoService.currentRepo }
    });
  }

}


