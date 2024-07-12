import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../core/service';
import {CoreService} from '../../../../core/service/core.service';
import {Core} from "../../../../core/model/core";
import {FormBuilder} from "@angular/forms";
import {RepositoryService} from "../../../../core/service/repository.service";
import {UUID} from "antlr4ts/misc/UUID";
import {CoreVersion} from "../../../../core/model/core-version";
import {Page} from "../../../../core/model/page";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModalNewCoreVersionComponent} from "../../../../modal/modal-new-core-version/modal-new-core-version.component";
import {
  ModalEditCoreVersionComponent
} from "../../../../modal/modal-edit-core-version/modal-edit-core-version.component";
import {StatusMessageService} from "../../../../core/service/status-message.service";
import {ModalConfirmComponent} from "../../../../modal/modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-my-core-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.scss'],
})

export class MyCoreVersionsComponent implements OnInit {
  @ViewChild('paginator') public paginator: MatPaginator;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public dataSource: MatTableDataSource<CoreVersion>;
  public displayedColumns: string[] = ['active', 'version_number', 'created', 'last_modified', 'usage_count', 'actions'];
  public core: Core = null;
  public coreVersions: Page<CoreVersion> = null;
  public loadingState: boolean = false;
  public versionsLoadingState: boolean = false;
  public uuid: UUID;

  constructor(
    private router: Router,
    private coreService: CoreService,
    private repoService: RepositoryService,
    public authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private statusMessageService: StatusMessageService,
  ) {
    this.route.params.subscribe((params) => {
      if (this.uuid === null) {
        this.uuid = params.uuid;
      } else {
        if (params.uuid !== this.uuid) {
          this.uuid = params.uuid;
          this.getCoreDetail();
        }
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    this.getCoreDetail();
    this.versionsLoadingState = true;
    this.getCoreVersions();
  }


  public pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCoreVersions();
  }

  public getCoreDetail(): void {
    this.loadingState = true;
    this.coreService.getMyCore(this.uuid).subscribe((c: Core) => {
      this.core = c;
      this.loadingState = false;
    }, (error) => {
      this.loadingState = false;
      this.statusMessageService.addError(error);
      this.router.navigate(['/cores/my']).finally();
    });
  }

  public getCoreVersions(): void {
    this.coreService.getMyCoreVersions(this.uuid, this.pageIndex, this.pageSize)
      .subscribe((versions: Page<CoreVersion>) => {
        this.coreVersions = versions;
        this.versionsLoadingState = false;
      }, (error) => {
        this.versionsLoadingState = false;
        this.statusMessageService.addError(error);
      });
  }

  public async openNewVersionDialog(): Promise<void> {
    const dialogRef: MatDialogRef<ModalNewCoreVersionComponent> = this.dialog
      .open(ModalNewCoreVersionComponent, {
        data: {coreUuid: this.core.uuid},
        width: 'auto'
      });
    const success: boolean | undefined = await dialogRef.afterClosed().toPromise();
    if (success === true) {
      this.getCoreVersions();
      this.getCoreDetail();
    }
  }

  public async openEditVersionDialog(version: CoreVersion): Promise<void> {
    const dialogRef: MatDialogRef<ModalEditCoreVersionComponent> = this.dialog
      .open(ModalEditCoreVersionComponent, {
        data: {
          core: this.core,
          coreVersion: version
        },
        width: 'auto'
      });
    const cv: CoreVersion | undefined = await dialogRef.afterClosed().toPromise();
    if (cv !== undefined) {
      const newC: CoreVersion[] = [...this.coreVersions.content];
      for (const i in this.coreVersions.content) {
        if (this.coreVersions.content[i].uuid === cv.uuid) {
          newC[i] = cv;
          break;
        }
      }
      this.coreVersions.content = newC;
    }
  }

  public async openDeleteVersionDialog(version: CoreVersion): Promise<void> {
    const dialogRef: MatDialogRef<ModalConfirmComponent> = this.dialog
      .open(ModalConfirmComponent, {
        data: {message: 'Are you sure you want to remove version ' + version.version_number + '?'},
        width: 'auto'
      });

    const result: boolean = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.versionsLoadingState = true;
      this.coreService.deleteCoreVersion(this.uuid, version.uuid)
        .subscribe(() => {
          this.getCoreVersions();
          this.versionsLoadingState = false;
        }, (error) => {
          this.versionsLoadingState = false;
          this.statusMessageService.addError(error);
        });
    }
  }
}
