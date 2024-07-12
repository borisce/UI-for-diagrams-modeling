import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/core/service/user.service';
import { RepositoryService } from 'src/app/core/service/repository.service';
import { EducationService } from 'src/app/core/service/education.service';
import { OrganizationService } from 'src/app/core/service/organization.service';
import { NewUser } from 'src/app/api/models/new-user';
import { Organization } from 'src/app/api/models/organization';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Repository } from 'src/app/api/models/repository';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdminEditUserComponent } from 'src/app/modal/modal-admin-edit-user/modal-admin-edit-user.component';
import { ModalAdminEditOrgComponent } from 'src/app/modal/modal-admin-edit-org/modal-admin-edit-org.component';
import { AuthenticationService } from 'src/app/core/service';
import { Router } from '@angular/router';
import { PricePackage } from '../../api/models/price-package';
import {
  ModalAdminEditPackageComponent
} from '../../modal/modal-admin-edit-package/modal-admin-edit-package.component';
import { Classroom } from '../../api/models/classroom/classroom';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public all_users: NewUser[] = [];
  public new_users: number = 0;
  public all_repos: Repository[] = [];
  public new_repos: number = 0;
  public all_classrooms: Classroom[] = [];
  public new_classrooms: number = 0;
  public all_organizations: Organization[] = [];
  public all_packages: any[] = [];
  public new_organizations: number = 0;
  public displayedColumnsUserTable: String[] = ['uuid', 'username', 'firstName', 'lastName', 'email', 'subscription'];
  public displayedColumnsOrgTable: String[] = ['uuid', 'name', 'owner', 'created', 'teams'];
  public displayColumnsPackageTable: String[] = ['id', 'name', 'type', 'price', 'default_members'];
  public userDataSource: any;
  public USER_DATA: NewUser[] = [];
  public orgDataSource: any;
  public packageDataSource: any;
  public ORG_DATA: Organization[] = [];
  public showExtraClass = true;
  public user: NewUser;
  public userRoles: any;
  public isAdmin: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private repositoryService: RepositoryService,
    private educationService: EducationService,
    private organizationService: OrganizationService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.all_users = [];
    this.all_repos = [];
    this.all_classrooms = [];
    this.all_organizations = [];
  }

  public ngOnInit(): void {
    this.getAuth();
    this.showPage();
  }

  /* Check if the user is ADMIN and if has access to the dashboard */
  public async getAuth(): Promise<any> {
    const user = this.authenticationService.currentUser;
    this.userRoles = await this.userService.getUserRoles(user.uuid).toPromise();
    if (this.userRoles.includes('ADMIN')) {
      this.isAdmin = true;
    }
  }

  public async showPage(): Promise<any> {
    const responseUsers: any = await this.userService.getAllUsers().toPromise();
    const responseRepos: any = await this.repositoryService.getAllRepos().toPromise();
    const responseClassrooms: any = await this.educationService.getAllClassroomsAdmin().toPromise();
    const responseOrgs: any = await this.organizationService.getAllOrganizations().toPromise();
    const responsePackages: any = await this.userService.getAllPackages().toPromise();

    this.all_users.push(...responseUsers.content);
    this.getNewUsers();

    this.all_repos.push(...responseRepos.content);
    this.getNewRepos();

    this.all_classrooms.push(...responseClassrooms.content);
    this.getNewClassrooms();

    this.all_organizations.push(...responseOrgs.content);
    this.getNewOrganizations();

    console.log(responsePackages, 'responsePackages');
    this.all_packages.push(...responsePackages);

    const USER_DATA = this.all_users;
    this.userDataSource = new MatTableDataSource(USER_DATA);

    this.userDataSource.paginator = this.paginator;
    this.userDataSource.sort = this.sort;

    const ORG_DATA = this.all_organizations;
    this.orgDataSource = new MatTableDataSource(ORG_DATA);

    this.orgDataSource.paginator = this.paginator;
    this.orgDataSource.sort = this.sort;

    const PACKAGE_DATA = this.all_packages;
    this.packageDataSource = new MatTableDataSource(PACKAGE_DATA);
  }

  /* Get newly registered users */
  public getNewUsers(): any {
    let todaysDate = new Date();

    for (let user of this.all_users) {
      var createdDate = new Date(user.created);

      if (createdDate.toDateString() == todaysDate.toDateString()) {
        this.new_users += 1;
      }
    }
  }

  /* Get newly created repositories */
  public getNewRepos(): any {
    let todaysDate = new Date();

    for (let repo of this.all_repos) {
      var createdDate = new Date(repo.created);

      if (createdDate.toDateString() == todaysDate.toDateString()) {
        this.new_repos += 1;
      }
    }
  }

  /* Get newly created organizations */
  public getNewOrganizations(): any {
    let todaysDate = new Date();

    for (let org of this.all_organizations) {
      var createdDate = new Date(org.created);

      if (createdDate.toDateString() == todaysDate.toDateString()) {
        this.new_organizations += 1;
      }
    }
  }

  /* Get newly created classrooms */
  public getNewClassrooms(): any {
    let todaysDate = new Date();

    for (let classroom of this.all_classrooms) {
      var createdDate = new Date(classroom.created);

      if (createdDate.toDateString() == todaysDate.toDateString()) {
        this.new_classrooms += 1;
      }
    }
  }

  /* Filters for live search in the user table */
  public applyFilterForUserTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();
    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

  /* Filters for live search in the organization table */
  public applyFilterForOrgTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orgDataSource.filter = filterValue.trim().toLowerCase();
    if (this.orgDataSource.paginator) {
      this.orgDataSource.paginator.firstPage();
    }
  }

  /* Reset data and reload page */
  public reloadPage() {
    this.all_users = [];
    this.all_repos = [];
    this.all_classrooms = [];
    this.all_organizations = [];
    this.all_packages = [];
    this.new_repos = 0;
    this.new_organizations = 0;
    this.new_classrooms = 0;
    this.new_users = 0;
    this.showPage();
  }

  /* Open dialog for selected user */
  public openUserDialog(user: NewUser) {
    this.dialog.open(ModalAdminEditUserComponent, {
      data: user
    }).afterClosed().subscribe(() => this.reloadPage());
  }

  /* Open dialog for selected organization */
  public openOrgDialog(org: Organization): void {
    this.dialog.open(ModalAdminEditOrgComponent, {
      data: org
    }).afterClosed().subscribe(() => this.reloadPage());
  }

  /* Open dialog for selected user */
  public openPackageDialog(prc: PricePackage) {
    this.dialog.open(ModalAdminEditPackageComponent, {
      data: prc
    }).afterClosed().subscribe(() => this.reloadPage());
  }
}
