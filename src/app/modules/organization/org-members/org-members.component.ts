import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationMemberManagementService, OrganizationService } from 'src/app/core/service/organization.service';
import {
  ModalDeleteOrgMembersComponent
} from 'src/app/modal/modal-delete-orgmembers/modal-delete-org-members/modal-delete-org-members.component';
import { ModalOrgDeleteOwnerComponent } from 'src/app/modal/modal-org-delete-owner/modal-org-delete-owner.component';
import { ModalOrgMemberInviteComponent } from 'src/app/modal/modal-org-member-invite/modal-org-member-invite.component';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StatusMessageService } from '../../../core/service/status-message.service';

export enum Role {
  TEAM_OWNER = 'Owner',
  TEAM_MEMBER = 'Member',
}

export interface TeamMember {
  first_name: String;
  last_name: String;
  role: Role;
  selected: boolean;
  uuid: string;
}

@Component({
  selector: 'app-org-members',
  templateUrl: './org-members.component.html',
  styleUrls: ['./org-members.component.scss'],
})
export class OrgMembersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['selector', 'first_name', 'last_name', 'username', 'email', 'role', 'actions'];
  organizationOwnerUuid: string = null;
  public ELEMENT_DATA: any = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  public dataItems = 0;
  public currentPage = 0;
  public pageSize = 30;
  public loading: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('select_all_checkbox') select_all_checkbox: MatCheckbox;
  allFreeOrganizationPackages: any = [];
  diagrams: number = 0;
  editor: number = 0;
  synthesis: number = 0;
  simulations: number = 0;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private orgMemberService: OrganizationMemberManagementService,
    private http: HttpClient,
    private statusMessageService: StatusMessageService,
    private orgService: OrganizationService) {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getOrgMembers(this.currentPage, this.pageSize);
    this.getOrgOwnerUuid();
    this.getFreeOrganizationPackages();
  }

  selectAll() {
    this.ELEMENT_DATA.forEach(e => e.selected = this.select_all_checkbox.checked);
  }

  private async getOrgOwnerUuid() {
    const response = await this.orgService.getOrganization().toPromise();
    this.organizationOwnerUuid = response.owner;
  }

  private async getOrgMembers(pageIndex: number, pageSize: number) {
    this.loading = true;
    const response = await this.orgMemberService.getOrganizationMembers(pageIndex, pageSize).toPromise();
    this.ELEMENT_DATA = response.content;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataItems = response.totalElements;
    this.loading = false;
  }

  inviteMember() {
    const dialogRef = this.matDialog.open(ModalOrgMemberInviteComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        // Invited new user
        this.orgMemberService.inviteOrganizationMember(r).subscribe(() => {
            this.getOrgMembers(this.currentPage, this.pageSize);
          },
          error => {
          });

        this.snackBar.open('User ' + r + ' has been invited!', null, {
          duration: 5000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom'
        });
      }
    });
  }

  deleteMembers() {
    // Get selected members
    const selectedMembers = this.getSelectedMembers();
    if (selectedMembers.length > 0) {
      // Check if users are selected

      if (selectedMembers[0].uuid == this.organizationOwnerUuid) {
        // Cannot delete organization owner
        const dialogRef = this.matDialog.open(ModalOrgDeleteOwnerComponent, {
          width: 'auto'
        });

        return;
      }

      const dialogRef = this.matDialog.open(ModalDeleteOrgMembersComponent, {
        width: 'auto',
        data: selectedMembers
      });

      dialogRef.afterClosed().subscribe((r) => {
        if (r) {
          // Delete members
          selectedMembers.forEach((member) => this.orgMemberService.deleteOrganizationMember(member.uuid).subscribe(() => {
              this.getOrgMembers(this.currentPage, this.pageSize);
            },
            error => {
            }
          ));
        }
      });
    } else {
      this.snackBar.open('No organization members have been selected!', null, {
        duration: 5000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
    }
  }

  private getSelectedMembers() {
    return this.ELEMENT_DATA.filter((e) => e.selected);
  }

  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getOrgMembers(this.currentPage, this.pageSize);
  }

  public getFreeOrganizationPackages(): void {
    this.http.get(environment.baseUrl + '/organization/packages').subscribe((response: any) => {
      this.allFreeOrganizationPackages = response;

      this.allFreeOrganizationPackages.forEach((pkg: any) => {
        if (pkg.price_package_id === 4 || pkg.price_package_id === 9) {
          this.diagrams = this.diagrams + 1;
        }

        if (pkg.price_package_id === 5 || pkg.price_package_id === 10) {
          this.editor = this.editor + 1;
        }

        if (pkg.price_package_id === 7 || pkg.price_package_id === 2) {
          this.simulations = this.simulations + 1;
        }

        if (pkg.price_package_id === 3 || pkg.price_package_id === 8) {
          this.synthesis = this.synthesis + 1;
        }
      });
    }, (error) => {
      this.statusMessageService.addError(error);
    });
  }

  public async updateUserPackage(user: any, packageType: number[], type: number): Promise<void> {
    this.orgMemberService.updateUserPackage(user.uuid, packageType).subscribe((r: any) => {
        if (type === 1) {
          this.synthesis = this.synthesis - 1;
        }

        if (type === 2) {
          this.simulations = this.simulations - 1;
        }

        if (type === 3) {
          this.diagrams = this.diagrams - 1;
        }

        if (type === 4) {
          this.editor = this.editor - 1;
        }

        this.statusMessageService.addSuccess('Permission updated');
      },
      error => {
        this.statusMessageService.addError(error);
      });

  }
}
