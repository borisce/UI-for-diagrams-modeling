import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../../../core/service';
import { first } from 'rxjs/operators';

interface ResetPwdData {
  email: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  public resetPwdForm: UntypedFormGroup;
  public loading: boolean = false;
  public error: string;
  public success: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.resetPwdForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }

  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  public onSubmit(resetPwdData: ResetPwdData): any {}

}
