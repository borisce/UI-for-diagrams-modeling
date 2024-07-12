import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import {Page} from "../../../core/model/page";
import {AuthenticationService} from "../../../core/service";
import {UserBalanceChange} from "../../../core/model/user-balance-change";
import {OrganizationService} from "../../../core/service/organization.service";
import {Organization} from "../../../core/model/organization.model";
import {StatusMessageService} from "../../../core/service/status-message.service";

@Component({
  selector: 'app-organization-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})

export class OrganizationWalletComponent implements OnInit {
  @ViewChild('paginator') public paginator: MatPaginator;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public loadingState: boolean = true;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public dataSource: MatTableDataSource<UserBalanceChange>;
  public displayedColumns: string[] = ['created', 'created_by', 'description', 'amount'];
  public balanceChanges: Page<UserBalanceChange>;
  public organization: Organization;

  constructor(
    public authenticationService: AuthenticationService,
    private organizationService: OrganizationService,
    private statusMessageService: StatusMessageService,
  ) {
  }

  public pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getBalanceChanges();
  }

  public async ngOnInit(): Promise<void> {
    if (this.authenticationService.haveOwnerPermission) {
      this.loadingState = true;
      this.getBalanceChanges();
      this.organization = await this.organizationService.getOrganization().toPromise();
    }
  }

  public getBalanceChanges(): void {
    if (!this.authenticationService.haveOwnerPermission) {
      return;
    }
    this.organizationService.getBalanceChanges(this.pageIndex, this.pageSize)
      .subscribe((p: Page<UserBalanceChange>) => {
        this.balanceChanges = p;
        this.loadingState = false;
      }, (error) => {
        this.loadingState = false;
        this.statusMessageService.addError(error);
      });
  }
}
