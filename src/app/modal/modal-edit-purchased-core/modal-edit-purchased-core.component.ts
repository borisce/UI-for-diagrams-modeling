import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CoreService} from "../../core/service/core.service";
import {StatusMessageService} from "../../core/service/status-message.service";
import {CoreOwnership} from "../../core/model/core-ownership";
import {Page} from "../../core/model/page";
import {Repository} from "../../api/models/repository";
import {CoreVersionOwned} from "../../core/model/core-version-owned";
import {RepositoryService} from "../../core/service/repository.service";
import {OrganizationService} from "../../core/service/organization.service";

@Component({
  selector: 'app-modal-edit-purchased-core',
  styleUrls: ['./modal-edit-purchased-core.component.scss'],
  templateUrl: './modal-edit-purchased-core.component.html'
})
export class ModalEditPurchasedCoreComponent implements OnInit {
  public form: FormGroup;
  public loadingState: boolean = false;
  public error: string = null;
  public repositories: Repository[] = null;
  public versions: CoreVersionOwned[] = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditPurchasedCoreComponent>,
    public coreService: CoreService,
    private statusMessageService: StatusMessageService,
    private repoService: RepositoryService,
    private organizationService: OrganizationService,
    @Inject(MAT_DIALOG_DATA) public data: {
      coreOwnership: CoreOwnership
    }
  ) {
    this.form = this.fb.group({
      repository_uuid: [this.data.coreOwnership.repository !== null ?
        this.data.coreOwnership.repository.uuid : null],
      active_core_version_uuid: [this.data.coreOwnership.active_core_version !== null ?
        this.data.coreOwnership.active_core_version.uuid : null],
    });
  }


  public async ngOnInit(): Promise<void> {
    this.getRepositories();
    this.getCoreVersions();
  }

  public getRepositories(): void {
    // if (this.data.coreOwnership.organization != null) {
    //   this.organizationService.getOrganizationRepos(0, 9999)
    //     .subscribe(
    //       (page: Page<Repository>) => {
    //         this.repositories = page.content;
    //       },
    //       (error) => {
    //         this.statusMessageService.addError(error);
    //       }
    //     );
    // } else {
    this.repoService.getAssociatedRepos(0, 9999)
      .subscribe(
        (page: Page<Repository>) => {
          this.repositories = page.content;
        },
        (error) => {
          this.statusMessageService.addError(error);
        }
      );
    //}
  }

  public getCoreVersions(): void {
    this.coreService.getPurchasedCoreVersions(this.data.coreOwnership.uuid, 0, 9999)
      .subscribe(
        (page: Page<CoreVersionOwned>) => {
          this.versions = page.content;
        },
        (error) => {
          this.statusMessageService.addError(error);
        }
      );
  }

  public async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.loadingState = true;
    this.error = null;
    this.coreService.updatePurchasedCore(this.data.coreOwnership.uuid, this.form.value)
      .subscribe((c: CoreOwnership) => {
          this.loadingState = false;
          this.statusMessageService.addSuccess('Changes saved');
          this.dialogRef.close(c);
        },
        (e) => {
          this.loadingState = false;
          this.error = e;
        });
  }

  public closeDialog(e: MouseEvent): void {
    e.preventDefault();
    this.dialogRef.close(undefined);
  }
}
