import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService, UserService} from '../../../../core/service';
import {first} from 'rxjs/operators';
import {
  ModalConfirmSettingsActionComponent
} from '../../../../modal/modal-confirm-settings-action/modal-confirm-settings-action.component';
import {MatDialog} from '@angular/material/dialog';
import {emailControlValidator} from '../../../../shared/emai-validator.directive';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OrganizationService} from 'src/app/core/service/organization.service';
import {UUID} from "antlr4ts/misc/UUID";

@Component({
  selector: 'app-user-editation',
  templateUrl: './user-editation.component.html',
  styleUrls: ['./user-editation.component.scss']
})
export class UserEditationComponent implements OnInit {
  public editForm: UntypedFormGroup;
  public changePasswordForm: UntypedFormGroup;
  public operationsForm: UntypedFormGroup;
  public firstName: string;
  public lastName: string;
  public email: string;
  public error: string;
  public success: string;
  public submittedInformation: boolean = false;
  public submittedPassword: boolean = false;
  public loading: boolean = false;
  public uuid: UUID = this.authenticationService.currentUser.uuid;

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private organizationService: OrganizationService,
              private userService: UserService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
  ) {
    // redirect to home if already logged in
    if (!this.authenticationService.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      // @ts-ignore
      this.firstName = this.authenticationService.currentUser.firstName;
      // @ts-ignore
      this.lastName = this.authenticationService.currentUser.lastName;
      // @ts-ignore
      this.email = this.authenticationService.currentUser.email;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  get p() {
    return this.changePasswordForm.controls;
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('newPassword').value;
    const confirmPassword: string = control.get('newPasswordAgain').value;
    if (password !== confirmPassword) {
      control.get('newPasswordAgain').setErrors({no_match: true});
    }
  }

  public ngOnInit(): void {
    const todaysDate = new Date();
    this.editForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.email, [Validators.required, emailControlValidator]],
      lastAccountEdit: [todaysDate],
      isAdmin: [false],
    });
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      newPasswordAgain: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      lastAccountEdit: [todaysDate],
    }, {
      validators: UserEditationComponent.passwordMatchValidator
    });
    this.operationsForm = this.formBuilder.group({});
  }

  public openDialog(header: string, body: string): any {
    return this.dialog.open(ModalConfirmSettingsActionComponent, {
      width: '600px',
      data: {header, body}
    });
  }

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
          let todaysDate = new Date();
          this.userService.markUserAdmin({
            "edited": true,
            "logged": false,
            "signed": false,
            "date": todaysDate
          }).subscribe();

          this.authenticationService.update(this.editForm.value);
          this.loading = false;
        },
        error1 => {
          this.loading = false;
        }
      );
    }

    if (submitType === 'changePassword') {
      this.submittedPassword = true;
      if (this.changePasswordForm.invalid) {
        return;
      }
      this.loading = true;
      if (this.changePasswordForm.value.newPassword ===
        this.changePasswordForm.value.newPasswordAgain) {
        this.userService.update({
            oldPassword: this.changePasswordForm.value.oldPassword,
            password: this.changePasswordForm.value.newPassword
          }
        ).pipe(first()).subscribe(
          data => {
            let todaysDate = new Date();
            this.userService.markUserAdmin({
              "edited": true,
              "logged": false,
              "signed": false,
              "date": todaysDate
            }).subscribe();

            this.loading = false;
            this.snackBar.open('Password changed successfully', null, {
              duration: 5000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom'
            });
          },
          error1 => {
            this.snackBar.open('Password change failed', null, {
              duration: 5000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom'
            });
            this.loading = false;
          }
        );
      } else {
        this.loading = false;
      }
    }

    if (submitType === 'deleteAccount') {
      this.openDialog('Delete account?', 'Are you sure you want to delete your account?')
        .afterClosed().subscribe(
        result => {
          if (result === true) {
            this.loading = true;
            this.userService.delete().pipe(first()).subscribe(
              data => {
                this.authenticationService.logout();
                this.router.navigate(['/']);
              },
              error1 => {
              }
            );
          }
        }
      );
    }

    if (submitType === 'leaveOrganization') {
      this.openDialog('Leave organization?', 'Are you sure you want to leave your organization?')
        .afterClosed().subscribe(
        result => {
          if (result === true) {
            this.loading = true;
            this.organizationService.leaveOrganization().pipe(first())
              .subscribe(
                data => {
                  this.authenticationService.organization = null;
                  this.authenticationService.currentOrganization = null;
                  this.loading = false;
                  this.router.navigate(['/my-repos']);
                },
                error => {
                  this.loading = false;
                });
          }
        }
      );
    }

    if (submitType === 'deleteOrganization') {
      this.openDialog('Delete organization?', 'Are you sure you want to delete your organization?')
        .afterClosed().subscribe(
        result => {
          if (result === true) {
            this.loading = true;
            this.organizationService.deleteOrganization().pipe(first())
              .subscribe(
                data => {
                  this.authenticationService.organization = null;
                  this.authenticationService.currentOrganization = null;
                  this.loading = false;
                  this.router.navigate(['/my-repos']);
                },
                error => {
                  this.loading = false;
                });
          }
        }
      );
    }
  }

}
