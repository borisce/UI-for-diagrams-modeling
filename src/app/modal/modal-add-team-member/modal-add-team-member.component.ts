import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationMemberManagementService, OrganizationTeamManagementService } from 'src/app/core/service/organization.service';

@Component({
  selector: 'app-modal-add-team-member',
  templateUrl: './modal-add-team-member.component.html',
  styleUrls: ['./modal-add-team-member.component.scss']
})
export class ModalAddTeamMemberComponent implements OnInit {
  public loading: boolean = false;
  displayedColumns: string[] = ["selector", "first_name", "last_name", "username", "email", "role"];
  organizationOwnerUuid: string = null;
  public ELEMENT_DATA: any = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  public roleForm: UntypedFormGroup;

  public pageIndex = 0;
  public pageSize = 30;
  public dataItems = 0;
  public teamUuid = null;

  constructor(
    private orgMemberService: OrganizationMemberManagementService,
    private orgTeamMemberService: OrganizationTeamManagementService,
    private dialogRef: MatDialogRef<ModalAddTeamMemberComponent>,
    private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getOrgMembers(this.pageIndex, this.pageSize);
    this.roleForm = this.formBuilder.group({
      permission: new UntypedFormControl('Member', Validators.required)
    })
  }

  private async getOrgMembers(pageIndex: number, pageSize: number) {
    this.loading = true;
    const response = await this.orgMemberService.getOrganizationMembers(pageIndex, pageSize).toPromise();
    const team_members = await this.orgTeamMemberService.getOrganizationTeamMembers(this.teamUuid, 0, 99999).toPromise();
    const team_members_uuids = team_members.content.map(t => t.user.uuid);
    this.ELEMENT_DATA = response.content.filter(t => !team_members_uuids.includes(t.uuid));
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataItems = response.totalElements;
    this.loading = false;
  }

  pageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.getOrgMembers(this.pageIndex, this.pageSize);
  }

  private getSelectedMembers() {
    return this.ELEMENT_DATA.filter((e) => e.selected);
  }

  onSubmit() {
    const selectedMembers = this.getSelectedMembers();
    if (selectedMembers.length > 0 && this.roleForm.valid) {
      this.dialogRef.close({
        selectedMembers: selectedMembers,
        permission: this.roleForm.controls.permission.value
      });
    }
  }

}

export interface AddTeamMemberDialogOutput {
  selectedMembers: any;
  permission: any;
}
