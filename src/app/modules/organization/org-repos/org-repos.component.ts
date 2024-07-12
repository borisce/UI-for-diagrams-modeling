import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { OrganizationService } from 'src/app/core/service/organization.service';
import { Router } from '@angular/router';
import { Repository } from 'src/app/api/models/repository';
import { RepositoryService } from 'src/app/core/service/repository.service';
import { FilesService } from 'src/app/core/fileSystem/Filer/files.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

enum SORT {
  NAME_ASCENDING,
  NAME_DESCENDING,
  FAVORITE_ASCENDING,
  FAVORITE_DESCENDING,
}

@Component({
  selector: 'app-org-repos',
  templateUrl: './org-repos.component.html',
  styleUrls: ['./org-repos.component.scss'],
})
export class OrgReposComponent implements OnInit {
  public pageSize: number = 12;
  public repositories: any[] = [];
  public loadingState: boolean = false;
  public pageIndex: number = 0;
  public sortActive: SORT = null;
  public totalItems: number = 0;
  public totalPages: number = 0;
  public loading: boolean = false;

  @ViewChild('paginator') public paginator: MatPaginator;

  public stringComparator(a: string, b: string): number {
    if (a.toLowerCase() < b.toLowerCase()) { return -1; } else {
      if (a > b) {
        return 1;
      }
    }
    return 0;
  }

  public favoriteComparator(a: boolean, b: boolean): number {
    return a === b ? 0 : a ? -1 : 1;
  }

  public repoSortByName(): void {
    if (this.sortActive !== SORT.NAME_ASCENDING) {
      this.sortActive = SORT.NAME_ASCENDING;
      this.repositories.sort((a, b) => this.stringComparator(a.name, b.name));
    } else {
      this.sortActive = SORT.NAME_DESCENDING;
      this.repositories.sort((a, b) => this.stringComparator(b.name, a.name));
    }
  }

  public repoSortByFavorite(): void {
    if (this.sortActive !== SORT.FAVORITE_ASCENDING) {
      this.sortActive = SORT.FAVORITE_ASCENDING;
      this.repositories.sort((a, b) =>
        this.favoriteComparator(a.favorite, b.favorite)
      );
    } else {
      this.sortActive = SORT.FAVORITE_DESCENDING;
      this.repositories.sort((a, b) =>
        this.favoriteComparator(b.favorite, a.favorite)
      );
    }
  }

  public redirect(pageName: string): void {
    this.router.navigate(['/' + pageName]);
  }

  public reloadRepositories(): void {
    this.showPage(this.pageIndex, this.pageSize);
    this.redirect('organization/repos');

  }

  public selectRepo(repository: Repository): void {
    this.repositoryService.currentRepo = repository;
    if (!this.fileService.init()) {
      this.snackBar.open('Cannot initialize local storage', null, {
        duration: 5000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
      throwError('Cannot initialize local storage');
    }
    this.router.navigate(['/editor']);
  }

  public async newRepo(): Promise<void> {
    this.orgService.getOrganization().subscribe(org => {
      // console.log(org);
      this.dialog.open(ModalComponent, {
        width: '600px',
        panelClass: 'confirm-dialog-container',
        data: {
          is_private: false,
          orgUuid: org.uuid,
        }
      }).afterClosed().subscribe(_ => this.reloadRepositories());
    });
  }

  constructor(
    private dialog: MatDialog,
    private orgService: OrganizationService,
    private router: Router,
    private repositoryService: RepositoryService,
    private fileService: FilesService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.showPage(this.pageIndex, this.pageSize);
  }

  private async showPage(pageIndex: number, pageSize: number) {
    this.loading = true;
    const response = await this.orgService.getOrganizationRepos(pageIndex, pageSize).toPromise();
    this.totalItems = response.totalElements;
    this.totalPages = response.totalPages;
    this.repositories = response.content;
    this.loading = false;
  }

  public pageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.showPage(this.pageIndex, this.pageSize);
  }
}
