import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamMemberRole } from 'src/app/core/model/organization.model';
import { OrganizationTeamManagementService } from 'src/app/core/service/organization.service';
import {
  AddTeamMemberDialogOutput,
  ModalAddTeamMemberComponent
} from 'src/app/modal/modal-add-team-member/modal-add-team-member.component';
import { ModalCreateNewTeamComponent } from 'src/app/modal/modal-create-new-team/modal-create-new-team.component';
import {
  ModalEditOrgMemberComponent,
  UserData
} from 'src/app/modal/modal-edit-org-member/modal-edit-org-member.component';
import { ModalEditTeamNameComponent } from 'src/app/modal/modal-edit-team-name/modal-edit-team-name.component';
import {
  ModalRemoveTeamMemberComponent
} from 'src/app/modal/modal-remove-team-member/modal-remove-team-member.component';
import { ModalRemoveTeamComponent } from 'src/app/modal/modal-remove-team/modal-remove-team.component';
import { Role } from '../org-members/org-members.component';

@Component({
  selector: 'app-org-teams',
  templateUrl: './org-teams.component.html',
  styleUrls: ['./org-teams.component.scss'],
})
export class OrgTeamsComponent implements OnInit {
  public teamSelected: boolean = false;

  public teams: any[] = [];
  public teamsLoading: boolean = false;
  public teamMembersLoading: boolean = false;

  public teamsPageLength = 0;
  public teamsPageSize = 10;
  public teamsPageIndex = 0;

  public membersPageLength = 0;
  public membersPageSize = 10;
  public membersPageIndex = 0;

  public selectedTeamUuid: string = null;
  public selectedTeamName: string = null;
  public selectedTeamOwnerUsername: string = null;
  public teamOwnerUuid: string[] = [];
  displayedColumns: string[] = ["selector", "first_name", "last_name", "username", "email", "role"];
  public ELEMENT_DATA: any = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('select_all_checkbox') select_all_checkbox: MatCheckbox;
  @ViewChild('teamsPaginator') teamsPaginator: MatPaginator;
  @ViewChild('membersPaginator') membersPaginator: MatPaginator;

  constructor(
    private orgTeams: OrganizationTeamManagementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getTeams(this.teamsPageIndex, this.teamsPageSize);
    this.dataSource.sort = this.sort;
  }

  private async getTeams(pageIndex: number, pageSize: number) {
    this.teamsLoading = true;

    const response = await this.orgTeams.getOrganizationTeams(pageIndex, pageSize).toPromise();

    this.teamsPageLength = response.totalElements;
    this.teams = response.content;

    this.teamsLoading = false;
  }

  teamsPageEvent(event: PageEvent) {
    this.teamsPageIndex = event.pageIndex;
    this.teamsPageSize = event.pageSize;

    this.getTeams(this.teamsPageIndex, this.teamsPageSize);
  }

  membersPageEvent(event: PageEvent) {
    this.membersPageIndex = event.pageIndex;
    this.membersPageSize = event.pageSize;

    this.getMembers(this.membersPageIndex, this.membersPageSize);
  }

  private async getMembers(pageIndex: number, pageSize: number) {
    this.teamMembersLoading = true;
    const response = await this.orgTeams.getOrganizationTeamMembers(this.selectedTeamUuid, pageIndex, pageSize).toPromise();
    this.membersPageLength = response.totalElements;
    this.ELEMENT_DATA = response.content;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.getTeamOwner(this.selectedTeamUuid);

    this.teamMembersLoading = false;
  }

  private async getTeamOwner(uuid: string) {
    this.teamOwnerUuid = [];
    const response = await this.orgTeams.getOrganizationTeamDetails(uuid).toPromise();
    const members = response.memberships;
    members.forEach((item) => {
      if (item.permission == "ADMIN")
        this.teamOwnerUuid.push(item.user.uuid);
    })
  }

  createTeam() {
    const dialogRef = this.dialog.open(ModalCreateNewTeamComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        // Only if new team was submitted
        this.snackBar.open('New team was created!', null, {
          duration: 5000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom'
        })

        // Reload teams
        this.teamsPageIndex = 0;
        this.getTeams(this.teamsPageIndex, this.teamsPageSize);
      }
    });
  }

  removeTeam() {
    if (this.selectedTeamUuid != null) {
      const dialogRef = this.dialog.open(ModalRemoveTeamComponent, {
        width: 'auto',
      });

      dialogRef.afterClosed().subscribe((r) => {
        if (r) {
          // If delete is chosen
          this.orgTeams.deleteOrganizationTeam(this.selectedTeamUuid).pipe().subscribe(() => {
            this.snackBar.open('Team has been deleted!', null, {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'left'
            });

            this.selectedTeamUuid = null;

            // Reload teams
            this.teamsPageIndex = 0;
            this.teamsPaginator.pageIndex = 0;
            this.getTeams(this.teamsPageIndex, this.teamsPageSize);
          }, error => {
            this.snackBar.open(error, null, {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'left'
            });
          })
        }
      })
    } else {
      this.snackBar.open("Team has not been selected!", null, {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    }
  }

  editTeam() {
    if (this.selectedTeamUuid != null) {
      const dialogRef = this.dialog.open(ModalEditTeamNameComponent, {
        width: '500px',
        data: {
          teamName: this.selectedTeamName
        }
      });

      dialogRef.afterClosed().subscribe((r) => {
        if (r != false) {
          this.orgTeams.updateOrganizationTeam(this.selectedTeamUuid, r).pipe().subscribe(() => {
            this.snackBar.open('Team name has been changed!', null, {
              duration: 5000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom'
            });

            this.selectedTeamUuid = null;

            // Reload teams
            this.teamsPageIndex = 0;
            this.teamsPaginator.pageIndex = 0;
            this.getTeams(this.teamsPageIndex, this.teamsPageSize);
          }, error => {
            this.snackBar.open(error, null, {
              duration: 5000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom'
            });
          })
        }
      })
    }
  }

  onTeamSelected(uuid) {
    this.teamMembersLoading = true;
    if (this.selectedTeamUuid == uuid) {
      this.teamSelected = false;
      this.selectedTeamUuid = null;
      this.selectedTeamOwnerUsername = null;
    } else {
      if (!this.teamSelected) {
        this.teamSelected = !this.teamSelected;
      }
      this.selectedTeamUuid = uuid;
      this.selectedTeamOwnerUsername = this.teams.find(t => t.uuid === uuid).createdBy;
      this.getMembers(this.membersPageIndex, this.membersPageSize);
      this.orgTeams.getOrganizationTeamDetails(this.selectedTeamUuid).pipe().subscribe((data) => this.selectedTeamName = data.name);
    }

    this.teamMembersLoading = false;
  }

  editUserRole(user, e) {
    let newRole;
    if (e.value == "ADMIN") {
      newRole = TeamMemberRole.ADMIN;
    } else {
      newRole = TeamMemberRole.MEMBER;
    }
    this.updatePermission(this.selectedTeamUuid, user.uuid, newRole);
  }

  addMember() {
    if (this.selectedTeamUuid != null) {
      const dialogRef = this.dialog.open(ModalAddTeamMemberComponent, {
        width: '800px'
      });
      dialogRef.componentInstance.teamUuid = this.selectedTeamUuid;

      dialogRef.afterClosed().subscribe((r: AddTeamMemberDialogOutput) => {
        const selectedMembers = r.selectedMembers;
        const permission = r.permission;

        selectedMembers.forEach(element => {
          this.orgTeams.addOrganizationTeamMember(this.selectedTeamUuid, element.uuid, permission == 'Owner' ? TeamMemberRole.ADMIN : TeamMemberRole.MEMBER).pipe().subscribe(() => {
            this.snackBar.open('Team member has been added!', null, {
              duration: 5000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom'
            });

            // Reload team members
            this.membersPageIndex = 0;
            this.teamsPaginator.pageIndex = 0;
            this.getMembers(this.membersPageIndex, this.membersPageSize);
          }, error => {
            this.snackBar.open(error, null, {
              duration: 5000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom'
            })
          });
        })
      });
    } else {
      this.snackBar.open('No team has been selected!', null, {
        duration: 5000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
    }
  }

  removeMember() {
    const selectedMembers = this.getSelectedMembers();
    if (selectedMembers.length > 0) {
      const dialogRef = this.dialog.open(ModalRemoveTeamMemberComponent, {
        width: 'auto',
        data: selectedMembers
      });

      dialogRef.afterClosed().subscribe((r) => {
        if (r) {
          // If confirmed delete
          selectedMembers.forEach(element => {
            this.orgTeams.deleteOrganizationTeamMember(this.selectedTeamUuid, element.user.uuid).pipe().subscribe(() => {
              this.snackBar.open('Team member has been deleted!', null, {
                duration: 5000,
                horizontalPosition: 'left',
                verticalPosition: 'bottom'
              });

              // Reload team members
              this.membersPageIndex = 0;
              this.membersPaginator.pageIndex = 0;
              this.getMembers(this.membersPageIndex, this.membersPageSize);
            }, error => {
              this.snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: 'left',
                verticalPosition: 'bottom'
              });
            })
          });
        }
      })
    } else {
      this.snackBar.open('No team members have been selected!', null, {
        duration: 5000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
    }
  }

  private getSelectedMembers() {
    return this.ELEMENT_DATA.filter((e) => e.selected);
  }

  selectAll() {
    this.ELEMENT_DATA.forEach(e =>
      e.selected = this.select_all_checkbox.checked && this.selectedTeamOwnerUsername !== e.user.username);
  }

  public async updatePermission(team_uuid: string, member_uuid: string, role: TeamMemberRole) {
    const response = await this.orgTeams.updateOrganizationTeamMember(team_uuid, member_uuid, role).subscribe((r) => {
      this.getMembers(this.membersPageIndex, this.membersPageSize);
    }, error => this.snackBar.open(error, null, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'left'
    }));
  }
}
