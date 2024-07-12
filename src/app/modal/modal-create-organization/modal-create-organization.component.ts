import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { OrganizationService } from 'src/app/core/service/organization.service';
import { first } from 'rxjs/operators';
import { Organization } from 'src/app/api/models/organization';
import { AuthenticationService } from 'src/app/core/service';

export class CreateOrgnaizationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modal-create-organization',
  templateUrl: './modal-create-organization.component.html',
  styleUrls: ['./modal-create-organization.component.scss']
})
/**
 * Modal for creating new repository. Modal will appear after clicking on add button.
 */
export class ModalCreateOrganizationComponent implements OnInit {
  public nameForm: UntypedFormGroup;
  public matcher: CreateOrgnaizationErrorStateMatcher;
  public creationError: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private organizationService: OrganizationService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<ModalCreateOrganizationComponent>) {
  }

  /**
   * Setting all forms
   */
  public ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
    this.matcher = new CreateOrgnaizationErrorStateMatcher();
  }

  public onSubmit(): void {
    if (this.nameForm.valid) {
      this.organizationService.createOrganization(this.nameForm.value.name).pipe(first())
        .subscribe(
          data => {
            const organization = data as Organization;
            this.authenticationService.organization = organization;
            this.dialogRef.close();
            this.router.navigate(['/organization']);
          },
          error => {
            this.nameForm.get('name').setErrors({ 'createError': true });
          });
    }
  }
}
