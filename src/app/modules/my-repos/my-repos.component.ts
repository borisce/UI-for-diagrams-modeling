import {Component, OnInit, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {RepositoryService} from '../../core/service/repository.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalComponent} from '../../modal/modal.component';
import {AuthenticationService} from '../../core/service';
import {Repository} from 'src/app/api/models/repository';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ModalDeleteRepoComponent} from 'src/app/modal/modal-delete-repo/modal-delete-repo.component';
import {throwError} from 'rxjs';
import {FilesService} from 'src/app/core/fileSystem/Filer/files.service';
import {debounce} from 'lodash';
import { GithubService } from 'src/app/core/service/github.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalRepositorySelect } from 'src/app/modal/modal-repository-select/modal-repository-select.component';
import { GithubRepository } from 'src/app/core/model/github';
import FS from '@isomorphic-git/lightning-fs';


@Component({
  selector: 'app-my-repos',
  templateUrl: './my-repos.component.html',
  styleUrls: ['./my-repos.component.scss'],
})

export class MyReposComponent implements OnInit {
  @ViewChild("paginator") paginator: MatPaginator;

  public repositories: Repository[];
  public filteredRepos: Repository[];
  public loadingState: boolean = true;
  public pageLength: number = 0;
  public pageSize: number = 12;
  public pageIndex: number = 0;
  public breakpoint: number;
  public allR: Repository[] = [];
  public favRepositorie: Repository[] = [];
  public selectedTabIndex: number = 0;
  public allReposFromAllUsers: Repository[] = [];
  public currentUser: any;
  public publicRepositories: Repository[] = [];
  public isGridView = true;
  public allRepositories: Repository[] = [];
  private allPublicRepositories: Repository[] = [];
  private debounceSearch: Function;
  private oldSearchValue: string = '';
  private searchedValue: string = '';

  public importLoading: boolean = false;

  constructor(
    private repositoryService: RepositoryService,
    private githubService: GithubService,
    public authenticationService: AuthenticationService,
    private fileService: FilesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.repositories = [];
    this.currentUser = this.authenticationService.currentUser;
    this.debounceSearch = debounce(this.getSearchedPublicRepos.bind(this), 600);

    const githubCode = route.snapshot.queryParams['code']

    if(githubCode) {
      this.githubService.getAccessToken(githubCode)
    }
  }

  get getAllRepositories() {
    return this.returnRepositoryType(this.allRepositories);
  }

  get getRepositories() {
    return this.returnRepositoryType(this.filteredRepos);
  }

  public async ngOnInit() {
    this.showPage(this.pageIndex);
    await this.getAllPublicRepos();
  }

  /**
   * Return API call for all public repos
   */
  public getAllPublicRepos(): any {
    this.repositoryService.getAllPublicRepos(this.pageIndex, this.pageSize).subscribe(
      (data) => {
        this.allPublicRepositories = data['content'];
        this.publicRepositories = data['content'];
        this.pageLength = data['totalElements'];
        this.loadingState = false;
      },
      (error) => {
        console.log("getAllPublicRepos error",error);
      }
    );

    return this.repositoryService.getAllPublicRepos(this.pageIndex, this.pageSize);
  }

  /**
   * Return API call for all repos associated with current user
   * @param page page number required
   * @param pageSize page size
   */
  public getAssociatedRepos(page: number, pageSize: number): any {
    return this.repositoryService.getAssociatedRepos(
      page,
      pageSize,
    );
  }

  getSearchedPublicRepos(name: string) {
    if (this.searchedValue.length >= MIN_SEARCH_LENGTH) {
      this.repositoryService.getSearchPublicRepos(name, this.pageIndex, this.pageSize).subscribe(
        (data) => {
          this.publicRepositories = data['content'];
          this.pageLength = data['totalElements'];
          this.pageIndex = data['number'];
        }
      );
    }
  }

  /**
   * Loads repos using api or cache and show them on the screen
   * @param page Number of desired page
   */
  public async showPage(page: number): Promise<any> {

    if (this.allRepositories.length <= page * this.pageSize) {
      // Page wasn't loaded yet, make API call
      this.loadingState = true;

      let reposPage = await this.getReposPageContent();

      this.allRepositories.push(...reposPage.content);
      this.countRepos(0, 1000);

      if (this.selectedTabIndex === MY_REPOSITORY_TAB_INDEX || this.selectedTabIndex === FAVORITE_TAB_INDEX) {
        // Sort by favorite
        this.allRepositories.sort(function (x, y) {
          return (x.favorite === y.favorite) ? 0 : x.favorite ? -1 : 1;
        });
      } else if (this.selectedTabIndex === ARCHIVED_TAB_INDEX) {
        // Sort by archived
        this.allRepositories.sort(function (x, y) {
          return (x.archived === y.archived) ? 0 : x.archived ? -1 : 1;
        });
      }

      this.repositories = this.allRepositories.slice(
        page * this.pageSize,
        page * this.pageSize + this.pageSize
      );

      this.filteredRepos = this.repositories;

      // PREFETCH NEXT PAGE
      this.cacheRepoPage(this.pageIndex + 1);
      this.loadingState = false;
    } else {
      if (this.selectedTabIndex === MY_REPOSITORY_TAB_INDEX || this.selectedTabIndex === FAVORITE_TAB_INDEX) {
        // Sort by favorite
        this.allRepositories.sort(function (x, y) {
          return (x.favorite === y.favorite) ? 0 : x.favorite ? -1 : 1;
        });
      } else if (this.selectedTabIndex === ARCHIVED_TAB_INDEX) {
        // Sort by archived
        this.allRepositories.sort(function (x, y) {
          return (x.archived === y.archived) ? 0 : x.archived ? -1 : 1;
        });
      }


      // switch page, use cached repositories
      this.repositories = this.allRepositories.slice(
        page * this.pageSize,
        page * this.pageSize + this.pageSize
      );

      this.filteredRepos = this.repositories;
    }
  }

  public async pageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.publicRepositories = [];
    this.repositories = [];
    this.filteredRepos = [];

    if (this.selectedTabIndex === PUBLIC_TAB_INDEX) {
      if (this.searchedValue !== '') {
        await this.getSearchedPublicRepos(this.searchedValue);
      } else {
        this.getAllPublicRepos();
      }
    } else {
      if (this.searchedValue !== '') {
        this.filteredRepos = this.allRepositories;
        this.filteredRepos = this.filteredRepos.filter((repo) => {
          return repo.name.toLowerCase().includes(this.searchedValue.toLowerCase());
        });
      } else {
        this.showPage(this.pageIndex);
      }
    }
  }

  public async countRepos(page: number, pageSize: number): Promise<any> {
    this.allR = [];
    let reposPage: any;

    if (this.selectedTabIndex !== PUBLIC_TAB_INDEX) {
      reposPage = await this.getAssociatedRepos(
        page,
        pageSize
      ).toPromise();
    } else {
      reposPage = await this.getAllPublicRepos().toPromise();
    }

    this.allR.push(...reposPage.content);
    if (this.selectedTabIndex === MY_REPOSITORY_TAB_INDEX) {
      this.pageLength = this.allR.length;
    } else if (this.selectedTabIndex === FAVORITE_TAB_INDEX) {
      const favRepoCount = this.allR.filter(({favorite}) => favorite === true).length;
      this.pageLength = favRepoCount;
    } else if (this.selectedTabIndex === ARCHIVED_TAB_INDEX) {
      const archRepoCount = this.allR.filter(({archived}) => archived === true).length;
      this.pageLength = archRepoCount;
    } else if (this.selectedTabIndex === PUBLIC_TAB_INDEX) {
      const publicRepoCount = this.allRepositories.length;
      this.pageLength = publicRepoCount;
    }
  }

  public importRepository(): void {
    this.importLoading = true;
    this.githubService.getRepositories().subscribe((repos) => {
      this.importLoading = false;

      this.openRepositorySelectDialog(repos);
    }, (error: HttpErrorResponse) => {
      this.importLoading = false;

      if(error.status === 401) {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${environment.githubClientId}&scope=repo`
      }
    })
  }

  /**
   * Returns API call for repos
   * @param page page number required
   */
  public getRepos(page: number, pageSize: number): any {
    return this.repositoryService.getRepos(
      this.authenticationService.currentUser.username,
      page,
      pageSize
    );
  }

  /**
   * Event handler for selecting a repo,
   * redirects to editor
   * @param repo Selected repository
   */
  public selectRepo(repo: Repository): void {
    this.repositoryService.currentRepo = repo;
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

  /**
   * Event handler for making a repository favorite
   * @param repo Selected repository
   */
  public favoriteRepo(repo: Repository): void {
    repo.favorite = !repo.favorite;
    this.repositoryService
      .favoriteRepo(repo.uuid)
      .subscribe((x) => {
        const snackBarRef = this.snackBar.open(
          repo.favorite
            ? '"' + repo.name + '"' + ' is now favorite!'
            : '"' + repo.name + '"' + ' is no longer favorite!',
          'Undo',
          {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom'
          }
        );

        snackBarRef.onAction().subscribe(() => this.favoriteRepo(repo));
        this.reloadRepos();
      });
  }

  /**
   * Event handler for archiving a repository
   * @param repo Selected repository
   */
  public archiveRepo(repo: Repository): void {
    repo.archived = !repo.archived;
    this.repositoryService
      .archivedRepo(repo.uuid)
      .subscribe((x) => {
        const snackBarRef = this.snackBar.open(
          repo.archived
            ? '"' + repo.name + '"' + ' is now archived!'
            : '"' + repo.name + '"' + ' is no longer archived!',
          'Undo',
          {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom'
          }
        );

        snackBarRef.onAction().subscribe(() => this.archiveRepo(repo));
        this.reloadRepos();
      });
  }

  /**
   * Event handler for clicking on create new repo button
   */
  public openNewRepoDialog(): void {

    this.dialog.open(ModalComponent, {
      width: '600px',
      panelClass: 'confirm-dialog-container',
      data: {
        is_private: true,
        uuid: this.currentUser.uuid
      }
    }).afterClosed().subscribe(_ => this.reloadRepos());
  }

  /**
   * Event handler for clicking on create new repo button
   */
  public openRepositorySelectDialog(repos: GithubRepository[]): void {

    this.dialog
      .open(ModalRepositorySelect, {
        width: "600px",
        panelClass: "confirm-dialog-container",
        data: {
          repos,
          message: 'Selected remote repository will be added to your ASICDE repository list.'
        },
      })
      .afterClosed()
      .subscribe((repo: GithubRepository) => {
        if (repo) {
          this.saveRepository(repo);
        }
      });
  }

  public saveRepository(repo: GithubRepository): void {
    // Initial file service for access to indexedDB.
    this.fileService.fs = new FS(repo.name);
    this.fileService.pfs = this.fileService.fs.promises;
    localStorage.setItem('myDir', repo.name);


    /**
     * Creaing new repo in order. New repo on BE -> Creating collab workspace
     */
    try {
      this.repositoryService.createNew({
        authorUUID: this.currentUser.uuid,
        description: repo.description,
        is_private: repo.private,
        isPublic: !repo.private,
        name: repo.name,
        uri: repo.html_url
      })
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

            await this.fileService.gitClone(repo.name,
              repo.url)
              .then(
                dataClone => {
                  console.log('data downloaded')
                },
                error => {
                }
              );
            await this.githubService.zipFiles();
            this.reloadRepos();
          },
          error => {
            console.error(error)
          });
    } catch (exception) {
      console.error(exception)
    }
  }

  public openDeleteDialog(repo: Repository): void {
    const dialogRef: any = this.dialog.open(ModalDeleteRepoComponent, {
      width: '450px',
      data: {...repo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.repositoryService.deleteRepo(repo.uuid).pipe(first())
          .subscribe(
            res => {
              let todaysDate = new Date();
              this.repositoryService.markRepoAdmin({
                "deleted": true,
                "date": todaysDate
              }).subscribe();
              indexedDB.deleteDatabase(repo.uuid);
              dialogRef.close();
              this.reloadRepos();
              this.repositories = this.repositories.filter(item => item !== repo);
              this.filteredRepos = this.repositories;
              this.allRepositories = this.repositories.filter(item => item !== repo);
            },
            error => {
            });
      } else {
        this.getRepos(this.pageIndex, this.pageSize);
      }
    });
  }

  public repoSettings(repo: Repository): void {
    this.repositoryService.currentRepoUuid = repo.uuid;
    this.router.navigate(['/repository']);
  }

  public repoCreateIPCore(repo: Repository): void {
    this.repositoryService.currentRepo = repo;
    this.router.navigate(['/cores/my/create']);
  }

  public selectedIndexChange(index: number) {
    this.selectedTabIndex = index;
    this.filteredRepos = this.repositories;
    this.reloadRepos();
  }

  getFilteredOptions(filteredOptions: any) {
    if (this.selectedTabIndex !== PUBLIC_TAB_INDEX) {
      this.filteredRepos = filteredOptions;
      this.pageLength = this.filteredRepos?.length;
    }
  }

  getSearchedValue(searchedValue: any) {
    this.searchedValue = searchedValue;

    if (searchedValue === '') {
      this.publicRepositories = this.allPublicRepositories;
      return;
    }

    if (searchedValue.length < MIN_SEARCH_LENGTH || this.oldSearchValue === searchedValue || this.selectedTabIndex !== PUBLIC_TAB_INDEX) {
      return;
    }

    if (searchedValue.length >= MIN_SEARCH_LENGTH) {
      this.debounceSearch(searchedValue);
    } else {
      this.publicRepositories = this.allPublicRepositories;
    }

    this.oldSearchValue = searchedValue;
  }

  /**
   * Reloads repo paginator
   */
  public reloadRepos(): void {
    this.allRepositories = [];
    this.repositories = [];
    this.filteredRepos = [];
    this.pageIndex = 0;
    //this.paginator.pageIndex = 0;
    this.showPage(this.pageIndex);
  }

  private async getReposPageContent() {
    let reposPage;

    if (this.selectedTabIndex === MY_REPOSITORY_TAB_INDEX || this.selectedTabIndex === FAVORITE_TAB_INDEX || this.selectedTabIndex === ARCHIVED_TAB_INDEX) {
      reposPage = await this.getAssociatedRepos(
        0,
        1000
      ).toPromise();
    } else if (this.selectedTabIndex == PUBLIC_TAB_INDEX) {
      reposPage = await this.getAllPublicRepos();
      this.publicRepositories = this.allPublicRepositories;
    }

    return reposPage;
  }

  private async cacheRepoPage(page: number): Promise<any> {

    if (this.allRepositories.length <= page * this.pageSize) {
      // Page wasn't loaded yet, make API call

      let reposPage = await this.getReposPageContent();
      if (!this.allPublicRepositories.length) {
        this.allRepositories.push(...reposPage.content);
      }
    }
  }

  private returnRepositoryType(repositories: Repository[]) {
    switch (this.selectedTabIndex) {
      case MY_REPOSITORY_TAB_INDEX:
        return repositories;
      case FAVORITE_TAB_INDEX:
        return repositories?.filter((repo) => repo.favorite);
      case ARCHIVED_TAB_INDEX:
        return repositories?.filter((repo) => repo.archived);
      case PUBLIC_TAB_INDEX:
        return this.publicRepositories;
    }
  }


}

const MY_REPOSITORY_TAB_INDEX = 0;
const FAVORITE_TAB_INDEX = 1;
const ARCHIVED_TAB_INDEX = 2;
const PUBLIC_TAB_INDEX = 3;
const MIN_SEARCH_LENGTH = 3;
