import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import {Page} from "../../../core/model/page";
import {AuthenticationService, UserService} from "../../../core/service";
import {UserBalanceChange} from "../../../core/model/user-balance-change";
import {StatusMessageService} from "../../../core/service/status-message.service";

@Component({
  selector: 'app-personal-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})

export class PersonalWalletComponent implements OnInit {
  @ViewChild('paginator') public paginator: MatPaginator;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public loadingState: boolean = true;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public dataSource: MatTableDataSource<UserBalanceChange>;
  public displayedColumns: string[] = ['created', 'created_by', 'description', 'amount'];
  public balanceChanges: Page<UserBalanceChange>;

  constructor(
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private statusMessageService: StatusMessageService,
  ) {
  }

  public pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getBalanceChanges();
  }

  public ngOnInit(): void {
    this.loadingState = true;
    this.getBalanceChanges();
  }

  public getBalanceChanges(): void {
    this.userService.getBalanceChanges(this.pageIndex, this.pageSize)
      .subscribe((p: Page<UserBalanceChange>) => {
          this.balanceChanges = p;
          this.loadingState = false;
        },
        (error) => {
          this.loadingState = false;
          this.statusMessageService.addError(error);
        });
  }
}
