import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../../../core/service';
import { first } from 'rxjs/operators';
import { NewUser } from 'src/app/api/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
/**
 * Component used for register user.
 */
export class RegisterComponent implements OnInit {
  public registerForm: UntypedFormGroup;
  public loading: any = false;
  public error: string;
  public hidePass: boolean = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/my-repos']);
    }
  }

  /**
   * Creating new form for register component.
   */
  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).*$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }


  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  /**
   * On submit checks if all inputs are valid.
   */
  public onSubmit(registerData: NewUser): void {
    if (this.registerForm.invalid) {
      return;
    }
    // Register user.
    this.loading = true;
    this.userService.register(registerData)
      .pipe(first())
      .subscribe(
        (res) => {
          // Navigate to login page with query param.
          this.loading = false;
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        (err) => {
          this.error = err;
          this.loading = false;
        }
      );
  }
}
