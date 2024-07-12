import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AuthenticationService} from '../../../../core/service';
import {CoreService} from '../../../../core/service/core.service';
import {MatTableDataSource} from "@angular/material/table";
import {Page} from "../../../../core/model/page";
import {StatusMessageService} from "../../../../core/service/status-message.service";
import {CoreUsage} from "../../../../core/model/core-usage";
import {UUID} from "antlr4ts/misc/UUID";

@Component({
  selector: 'app-my-core-usages',
  templateUrl: './usages.component.html',
  styleUrls: ['./usages.component.scss'],
})

export class MyCoreUsagesComponent implements OnInit {
  @ViewChild('paginator') public paginator: MatPaginator;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public loadingState: boolean = true;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public dataSource: MatTableDataSource<CoreUsage>;
  public displayedColumns: string[] = ['owner', 'version_number', 'up_to_major_version'];
  public coreUsages: Page<CoreUsage>;
  public uuid: UUID;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private coreService: CoreService,
    private statusMessageService: StatusMessageService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (this.uuid === null) {
        this.uuid = params.uuid;
      } else {
        if (params.uuid !== this.uuid) {
          this.uuid = params.uuid;
          this.getMyCoreUsages();
        }
      }
    });
  }

  public pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getMyCoreUsages();
  }

  public ngOnInit(): void {
    this.loadingState = true;
    this.getMyCoreUsages();
  }

  public getMyCoreUsages(): void {
    this.coreService.getMyCoreUsages(this.uuid, this.pageIndex, this.pageSize)
      .subscribe((c: Page<CoreUsage>) => {
        this.coreUsages = c;
        this.loadingState = false;
      }, (error) => {
        this.loadingState = false;
        this.statusMessageService.addError(error);
      });
  }
}
