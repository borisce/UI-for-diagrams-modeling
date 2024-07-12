import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {RepositoryService} from '../core/service/repository.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FilesService} from '../core/fileSystem/Filer/files.service';
import {first} from 'rxjs/operators';
import FS from '@isomorphic-git/lightning-fs';
import {CollabService} from '../core/service/collab.service';
import {Repository} from '../api/models/repository';
import {MatSnackBar} from '@angular/material/snack-bar';
import {throwError} from 'rxjs';
import {CodecompletionService} from '../api/codecompletion/services/codecompletion.service';
import { GithubService } from '../core/service/github.service';

export interface DialogData {
  name: string;
  uri: string;
  description: string;
  getRepos: any;
  is_private: boolean;
  isPublic: boolean;
  uuid?: string;
  orgUuid?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
/**
 * Modal for creating new repository. Modal will appear after clicking on add button.
 */
export class ModalComponent implements OnInit {

  public repoForm: UntypedFormGroup;
  public repoNoGitFrom: UntypedFormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public returnUrl: string;
  public myCheckbox: boolean = false;
  public isPublicRepo: boolean = true;
  public error: string;
  public selected: string = 'default';
  public errorNew: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private repositoryService: RepositoryService,
    private collabService: CollabService,
    private completionService: CodecompletionService,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FilesService,
    public dialogRef: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar,
    private githubService: GithubService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  /**
   * Better access to form variables.
   */
  get f(): any {
    return this.repoForm.controls;
  }

  /**
   * Better access to form variables for creating no git repository.
   */
  get noGit(): any {
    return this.repoNoGitFrom.controls;
  }

  /**
   * Closing modal
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Setting all forms
   */
  public ngOnInit(): void {

    this.repoForm = this.formBuilder.group({
      name: ['', Validators.required],
      uri: ['', Validators.compose([Validators.required,
        // Regex pattern for git repositories.
        Validators.pattern('(https:\\/\\/)((github.com)|(bitbucket.org))(\\/)' +
          '([a-zA-z0-9-_]+)(\\/)' +
          '([a-zA-z0-9-_]+)(\\/)*' +
          '([a-zA-z0-9-_]+)(\\/)*' +
          '([a-zA-z0-9-_]+)*(\\/)*')
      ])],
      description: [''],
      gitName: [''],
      gitPassword: [''],
      isPublic: [true],
    });

    this.repoForm.controls['name'].valueChanges.subscribe(value => {
      this.repoForm.patchValue({name: value.replace(/\s+/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}, {emitEvent: false});
    });

    this.repoNoGitFrom = this.formBuilder.group({
      name: ['', Validators.required],
      uri: [' '],
      description: [''],
      isPublic: [true],
    });

    this.repoNoGitFrom.controls['name'].valueChanges.subscribe(value => {
      this.repoNoGitFrom.patchValue({name: value.replace(/\s+/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}, {emitEvent: false});
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/my-repos';
  }

  /**
   * After submitting repo information while creating git repo.
   */
  public async onSubmit() {
    this.submitted = true;
    let rejected: boolean = false;
    if (this.repoForm.invalid) {
      return;
    }

    // Initial file service for access to indexedDB.
    this.fileService.fs = new FS(this.f.name.value);
    this.fileService.pfs = this.fileService.fs.promises;
    localStorage.setItem('myDir', '/temp_' + this.f.name.value);


    this.loading = true;
    /**
     * Creaing new repo in order. New repo on BE -> Creating collab workspace
     */
    try {
      const observer = {
        next: value => console.log("modal component",value * 2),
        complete: () => console.log('DONE'),
      };

      this.repoForm.value.is_private = this.data.is_private;
      this.repoNoGitFrom.value.isPublic = this.isPublicRepo;
      this.repositoryService.createNew(this.repoForm.value)
        .pipe(first())
        .subscribe(
          async data => {
            this.repositoryService.currentRepo = data as Repository;

            if (!this.fileService.init()) {
              this.snackBar.open('Cannot initialize local storage', null, {
                duration: 5000,
                horizontalPosition: 'left',
                verticalPosition: 'bottom'
              });
              throwError('Cannot initialize local storage');
            }

            await this.fileService.gitClone('/temp_' + this.f.name.value,
              this.f.uri.value)
              .then(
                dataClone => {
                  this.loading = false;
                  this.dialogRef.close();
                },
                error => {
                  this.myCheckbox = true;
                  rejected = true;
                  this.error = 'Unauthorized access to git !';
                  this.loading = false;
                }
              );
            await this.githubService.zipFiles();
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = 'Repository name already in use !';
            this.loading = false;
            rejected = true;
          });

      if (rejected) {
        this.loading = false;
        return;
      }
    } catch (exception) {
    }
  }


  /**
   * New repo without git connection
   */
  public async onSubmitNewRepo(): Promise<any> {
    this.submitted = true;

    // stop here if form is invalid
    if (this.repoNoGitFrom.invalid) {
      return;
    }

    this.loading = true;
    try {
      this.repoNoGitFrom.value.is_private = this.data.is_private;
      this.repoNoGitFrom.value.isPublic = this.isPublicRepo;

      if (this.data.uuid) {
        this.repoNoGitFrom.value.authorUUID = this.data.uuid;
      } else if (this.data.orgUuid) {
        this.repoNoGitFrom.value.organizationUUID = this.data.orgUuid;
      }

      await this.repositoryService.createNew(this.repoNoGitFrom.value)
        .pipe(first())
        .subscribe(
          async data => {
            let todaysDate = new Date();
            this.repositoryService.markRepoAdmin({
              "created": true,
              "date": todaysDate
            }).subscribe();

            this.repositoryService.currentRepo = data as Repository;

            if (!this.fileService.init()) {
              this.snackBar.open('Cannot initialize local storage', null, {
                duration: 5000,
                horizontalPosition: 'left',
                verticalPosition: 'bottom'
              });
              throwError('Cannot initialize local storage');
            }

            localStorage.setItem('myDir', '/temp_' + this.noGit.name.value);

            /**
             * Different templates
             */
            if (this.selected === 'empty') {
              await this.fileService.createDir('/temp_' + this.noGit.name.value);
            } else if (this.selected === 'default') {
              await this.fileService.createDir('/temp_' + this.noGit.name.value);
              await this.fileService.createDir('/temp_' + this.noGit.name.value + '/src');
              await this.fileService.createDir('/temp_' + this.noGit.name.value + '/sim');
              await this.fileService.createDir('/temp_' + this.noGit.name.value + '/impl');
              await this.fileService.createDir('/temp_' + this.noGit.name.value + '/doc');
            }
            this.loading = false;
            await this.githubService.zipFiles();
            this.dialogRef.close();
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.errorNew = 'Repository name already in use !';
            this.loading = false;
          });
    } catch (exception) {
    }
  }

  /**
   * Checkbox for private git credentials.
   * @param event - checkbox event
   */
  public checkboxPrivateHandler(event: any): any {
    let checkboxValue;
    checkboxValue = event.checked;
    if (checkboxValue == true) {
      this.isPublicRepo = false;
    }
    if (checkboxValue == false) {
      this.isPublicRepo = true;
    }
  }
}
