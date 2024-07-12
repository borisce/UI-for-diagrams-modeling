import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganizationTeamManagementService } from 'src/app/core/service/organization.service';

@Component({
  selector: 'app-modal-create-new-team',
  templateUrl: './modal-create-new-team.component.html',
  styleUrls: ['./modal-create-new-team.component.scss']
})
export class ModalCreateNewTeamComponent implements OnInit {
  public newTeamForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private orgTeams: OrganizationTeamManagementService,
    private dialogRef: MatDialogRef<ModalCreateNewTeamComponent>) { }

  ngOnInit(): void {
    this.newTeamForm = this.formBuilder.group({
      'teamName': ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.newTeamForm.valid) {
      const teamName = this.newTeamForm.controls.teamName.value;
      this.orgTeams.createOrganizationTeam(teamName).subscribe(() => {
        this.dialogRef.close(true);
      }, error => {
      })
    }
  }
}
