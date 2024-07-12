import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService, UserService} from '../../../core/service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public editForm: UntypedFormGroup;
  public firstName: string;
  public lastName: string;
  public email: string;
  public error: string;
  public success: string;
  public submitted = false;
  public loading = false;
  public description: string;
  public sideBarOpened = true;
  public uuid = this.authenticationService.currentUser.uuid;

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService
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
      // @ts-ignore
      this.description = this.authenticationService.currentUser.description;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  public ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.email, Validators.required],
      description: [this.description],
    });
  }

  public onSubmit() {
    this.submitted = true;

    this.error = null;
    this.success = null;

    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.update(this.editForm.value,
      // @ts-ignore
      this.authenticationService.currentUser.id
    ).pipe(first()).subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error1 => {
      }
    );
  }
}
