import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../../../core/service';
import { first } from 'rxjs/operators';
import { LoginResponse } from 'src/app/api/models/login-response';

interface LoginData {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Component for logging in user.
 */
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  public loading: boolean = false;
  public returnUrl: string;
  public error: string;
  public success: string;
  public hidePass: boolean = true;
  public currentUser: LoginResponse;
  public email: string;
  public logged: boolean = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.loggedIn) {
      this.router.navigate(['/my-repos']);
    }
  }

  public ngOnInit(): any {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]]
    });


    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/my-repos';

    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Registration was successful !';
    }
  }

  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  public onSubmit(loginData: LoginData): any {
    this.error = null;
    this.success = null;
    if (this.loginForm.invalid) {
      return false;
    }

    if (loginData.username.indexOf('@') !== -1) {
      loginData.email = loginData.username;
      loginData.username = null;
    } else {
      loginData.email = null;
    }

    this.loading = true;

    // Call authenticationService login.
    this.authenticationService.login(loginData.username, loginData.email, loginData.password)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            const todaysDate = new Date();
            const editForm = this.formBuilder.group({
              lastLogin: todaysDate,
            });

            this.authenticationService.loginSuccessfull(editForm.value
              ).pipe(first()).subscribe(
                data => {
                  this.authenticationService.update(editForm.value);

                  if(this.logged) {
                    let todaysDate = new Date();
                    this.userService.markUserAdmin({
                      "logged": true,
                      "signed": false,
                      "edited": false,
                      "date": todaysDate
                    }).subscribe();
                    this.logged = false;
                  }

                  this.loading = false;
                },
                error1 => {
                  this.loading = false;
                }
            );
            this.router.navigate([this.returnUrl]);
          });
        },

        error => {
          this.error = error;
          this.loading = false;
          return false;
        });
  }

}
