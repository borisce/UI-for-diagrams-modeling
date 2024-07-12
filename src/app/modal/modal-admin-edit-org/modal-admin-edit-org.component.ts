import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from 'src/app/api/models/organization';
import { OrganizationMemberManagementService, OrganizationService } from 'src/app/core/service/organization.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-modal-admin-edit-org',
  templateUrl: './modal-admin-edit-org.component.html',
  styleUrls: ['./modal-admin-edit-org.component.scss']
})
export class ModalAdminEditOrgComponent implements OnInit {
  organizationName: String = null;
  teamMembers: number = 0;
  availableRepositories: number = 0;
  repositories: any[] = [];
  public error: string;
  public success: string;
  public loading: boolean = false;
  public submittedInformation: boolean = false;
  public editForm: UntypedFormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public org: Organization,
    private orgService: OrganizationService,
    private orgMemberService: OrganizationMemberManagementService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  /* Delete selected organization */
  public onDelete(org: any): void {
    let msg: string = `Are you sure you want to DELETE the following organization? ${org.name}`;

    const dialogRef: any = this.dialog.open(ModalConfirmComponent, {
      width: '450px',
      data: {
        message: msg
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loading = true;
        this.orgService.deleteSpecificOrganization(org.uuid).subscribe(
          data => {
            this.loading = false;
            this.dialog.closeAll();
          },
          error1 => {
            this.loading = false;
          }
        );
      }
    });
  }

}
