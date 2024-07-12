import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NewUser, UserWithActive } from 'src/app/api/models';
import { UserService } from 'src/app/core/service/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-modal-admin-package-user',
  templateUrl: './modal-admin-edit-package.component.html',
  styleUrls: ['./modal-admin-edit-package.component.scss']
})

export class ModalAdminEditPackageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public editForm: UntypedFormGroup;
  public selected: String;
  public error: string;
  public success: string;
  public submittedInformation: boolean = false;
  public loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public pricePackage: any,
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      uuid: [this.pricePackage.uuid, Validators.required],
      price: [this.pricePackage.price],
    });
  }

  /* Update edited user info in the User Edit Modal */
  public onSubmit(submitType: string): void {
    this.error = null;
    this.success = null;
    if (submitType === 'basicInformation') {

      if (this.editForm.invalid) {
        return;
      }
      this.loading = true;
      this.submittedInformation = true;

      this.userService.updatePackage(this.editForm.value
      ).pipe(
        first()).subscribe(
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
}
