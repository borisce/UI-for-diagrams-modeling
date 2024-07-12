import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NewUser, UserWithActive } from 'src/app/api/models';
import { ModalConfirmComponent } from '../../modal/modal-confirm/modal-confirm.component';
import { UserService } from 'src/app/core/service/user.service'
import { emailControlValidator } from '../../shared/emai-validator.directive';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/service';
import { MatAccordion } from '@angular/material/expansion';
import { Organization } from 'src/app/core/model/organization.model';
import { OrganizationService, OrganizationTeamManagementService } from 'src/app/core/service/organization.service';
import { RepositoryService } from 'src/app/core/service/repository.service';
import { EducationService } from 'src/app/core/service/education.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-admin-edit-user',
  templateUrl: './modal-admin-edit-user.component.html',
  styleUrls: ['./modal-admin-edit-user.component.scss']
})

export class ModalAdminEditUserComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public userRoles: any;
  public editForm: UntypedFormGroup;
  public selected: String;
  public error: string;
  public success: string;
  public submittedInformation: boolean = false;
  public loading: boolean = false;
  public otherRoles: any;
  public org: any;
  public orgOwner: boolean = false;
  public teams: any = [];
  public teamOwner: boolean = false;
  public userAdmin: boolean = false;
  public repos: any = [];
  public repoOwner: boolean = false;
  public classrooms: any = [];
  public classroomOwner: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: NewUser,
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private organizationService: OrganizationService,
    private organizationTeamManagementService: OrganizationTeamManagementService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private repositoryService: RepositoryService,
    private educationService: EducationService,
    private dialogRef: MatDialogRef<ModalAdminEditUserComponent>,
  ) {
  }

  ngOnInit(): void {
    this.getRoles();
    this.getOrganization();
    this.getTeams();
    this.getRepos();
    this.getClassrooms();

    const todaysDate = new Date();
    this.editForm = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, emailControlValidator]],
      lastAccountEdit: [todaysDate],
      isAdmin: [true],
    });
  }

  /* Get users roles and check if the user is admin for User Edit Modal */
  public async getRoles(): Promise<any> {
    this.userRoles = await this.userService.getUserRoles(this.user.uuid).toPromise();
    if(this.userRoles.includes("ADMIN")) {
      this.userAdmin = true;
    }
    this.selected = this.userRoles[0];
    if (this.selected === "TESTER") {
      this.otherRoles = "TESTER";
    }

    if(this.selected === "ADMIN") {
      this.otherRoles = "USER";
    }
    else {
      this.otherRoles = "ADMIN";
    }
  }

  /* Check if the user is in any organization and if hes the owner */
  public getOrganization(): any {
    this.organizationService.getOwnerOrg(this.user.username).pipe(first()).subscribe(
      (data) => {
        if(data) {
          this.orgOwner = true;
          this.org = data;
        }
      },
      (error) => {
        this.orgOwner = false;
      }
    );
  }

  /* Check if the user is in any team and if hes the owner */
  public async getTeams(): Promise<any> {
    const reponseTeams: any = await this.organizationTeamManagementService.getOwnerTeam(this.user.username).toPromise();
    this.teams.push(...reponseTeams.content);
    if(this.teams.length > 0) {
      this.teamOwner = true;
    }
    else {
      this.teamOwner = false;
    }
  }

  /* Check if the user has any repositories and if hes the owner */
  public async getRepos(): Promise<any> {
    const reponseRepos: any = await this.repositoryService.getOwnerRepo(this.user.username).toPromise();
    this.repos.push(...reponseRepos.content);
    if(this.repos.length > 0) {
      this.repoOwner = true;
    }
    else {
      this.repoOwner = false;
    }
  }

  /* Check if the user is in any classroom and if hes the owner */
  public async getClassrooms(): Promise<any> {
    const reponseClassrooms: any = await this.educationService.getOwnerClassrooms(this.user.username).toPromise();
    this.classrooms.push(...reponseClassrooms.content);
    if(this.classrooms.length > 0) {
      this.classroomOwner = true;
    }
    else {
      this.classroomOwner = false;
    }
  }

  get f() {
    return this.editForm.controls;
  }

  /* Update edited user info in the User Edit Modal */
  public onSubmit(submitType: string): void {
    this.error = null;
    this.success = null;

    if (submitType === 'basicInformation') {
      this.submittedInformation = true;
      if (this.editForm.invalid) {
        return;
      }
      this.loading = true;

      this.userService.update(this.editForm.value
      ).pipe(first()).subscribe(
        data => {
          this.authenticationService.update(this.editForm.value);
          this.loading = false;
        },
        error1 => {
          this.loading = false;
        }
      );
    }
  }

  /* Suspend or activate selected users account */
  public onSuspend(user: any, suspendAction: boolean): void {
    let msg: string = "";

    if(suspendAction) {
      msg = `Are you sure you want to ACTIVATE the following user? ${user.username}`;
    }
    else {
      msg = `Are you sure you want to SUSPEND the following user? ${user.username}`;
    }

    const dialogRef: any = this.dialog.open(ModalConfirmComponent, {
      width: '450px',
      data: {
        message: msg
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loading = true;
        user.active = suspendAction;
        this.userService.changeAccountStatus(user).subscribe(
          data => {
            this.loading = false;
          },
          error1 => {
            this.loading = false;
          }
        );
      }
    });
  }

  public changeRole(user_uuid: any, role: number): void {
    this.loading = true;
    this.userService.changeRole({user_uuid, role}).subscribe(
      data => {
        this.dialogRef.close();
        this.loading = false;
      },
      error1 => {
        this.dialogRef.close();
        this.loading = false;
      }
    );
  }

  public removeRole(user_uuid: any, role: number): void {
    this.loading = true;
    this.userService.removeRole({user_uuid, role}).subscribe(
      data => {
        this.loading = false;
      },
      error1 => {
        this.loading = false;
      }
    );
  }

  /* Delete a users account */
  // public onDelete(user: any): void {
  //   let msg: string = `Are you sure you want to DELETE the following user? ${user.username}`;

  //   const dialogRef: any = this.dialog.open(ModalConfirmComponent, {
  //     width: '450px',
  //     data: {
  //       message: msg
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === true) {
  //       this.loading = true;
  //       this.userService.deleteSpecificAccount(user.uuid).subscribe(
  //         data => {
  //           this.loading = false;
  //           this.dialog.closeAll();
  //         },
  //         error1 => {
  //           this.loading = false;
  //         }
  //       );
  //     }
  //   });
  // }

}
