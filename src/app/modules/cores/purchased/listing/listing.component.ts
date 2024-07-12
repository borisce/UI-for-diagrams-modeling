import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AuthenticationService} from '../../../../core/service';
import {CoreService} from '../../../../core/service/core.service';
import {MatTableDataSource} from "@angular/material/table";
import {Page} from "../../../../core/model/page";
import {CoreOwnership} from "../../../../core/model/core-ownership";
import {CartService} from "../../../../core/service/cart.service";
import {StatusMessageService} from "../../../../core/service/status-message.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  ModalEditPurchasedCoreComponent
} from "../../../../modal/modal-edit-purchased-core/modal-edit-purchased-core.component";

@Component({
  selector: 'app-purchased-core-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})

export class PurchasedCoreListingComponent implements OnInit {
  @ViewChild('paginator') public paginator: MatPaginator;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public loadingState: boolean = true;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public dataSource: MatTableDataSource<CoreOwnership>;
  public displayedColumns: string[] = ['core_name', 'repository', 'active_core_version', 'latest_core_version', 'up_to_major_version', 'actions'];
  public cores: Page<CoreOwnership>;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private coreService: CoreService,
    public cartService: CartService,
    private statusMessageService: StatusMessageService,
    private dialog: MatDialog,
  ) {
  }

  public pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getMyCores();
  }

  public ngOnInit(): void {
    this.getMyCores();
  }

  public getMyCores(): void {
    this.coreService.getPurchasedCores(this.pageIndex, this.pageSize)
      .subscribe((cores: Page<CoreOwnership>) => {
          this.cores = cores;
          this.loadingState = false;
        },
        (error) => {
          this.statusMessageService.addError(error);
          this.loadingState = false;
        });
  }

  public async openEditModal(core: CoreOwnership): Promise<void> {

    const dialogRef: MatDialogRef<ModalEditPurchasedCoreComponent> = this.dialog
      .open(ModalEditPurchasedCoreComponent, {
        data: {
          coreOwnership: core
        },
        width: 'auto'
      });
    const co: CoreOwnership | undefined = await dialogRef.afterClosed().toPromise();
    if (co !== undefined) {
      const newC: CoreOwnership[] = [...this.cores.content];
      for (const i in this.cores.content) {
        if (this.cores.content[i].uuid === co.uuid) {
          newC[i] = co;
          break;
        }
      }
      this.cores.content = newC;
    }
  }
}
