import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AuthenticationService} from '../../../../core/service';
import {CoreService} from '../../../../core/service/core.service';
import {MatTableDataSource} from "@angular/material/table";
import {Core} from "../../../../core/model/core";
import {Page} from "../../../../core/model/page";
import {StatusMessageService} from "../../../../core/service/status-message.service";
import {RepositoryService} from "../../../../core/service/repository.service";

@Component({
  selector: 'app-my-core-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})

export class MyCoreListingComponent implements OnInit {
  @ViewChild('paginator') public paginator: MatPaginator;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public loadingState: boolean = true;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public dataSource: MatTableDataSource<Core>;
  public displayedColumns: string[] = ['active', 'name', 'version_number', 'last_modified', 'usage_count', 'actions'];
  public cores: Page<Core>;

  constructor(
    public authenticationService: AuthenticationService,
    public repositoryService: RepositoryService,
    private router: Router,
    private coreService: CoreService,
    private statusMessageService: StatusMessageService,
  ) {
  }

  public pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getMyCores();
  }

  public ngOnInit(): void {
    this.loadingState = true;
    this.getMyCores();
  }

  public newIPCoreLinkClick(): void {
    console.log("clicked");
    this.repositoryService.currentRepo = null;
    this.router.navigate(['/cores/my/create']);
  }

  public getMyCores(): void {
    this.coreService.getMyCores(this.pageIndex, this.pageSize)
      .subscribe((c: Page<Core>) => {
        this.cores = c;
        this.loadingState = false;
      }, (error) => {
        this.loadingState = false;
        this.statusMessageService.addError(error);
      });
  }
}
