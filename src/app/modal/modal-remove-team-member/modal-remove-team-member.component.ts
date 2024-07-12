import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-remove-team-member',
  templateUrl: './modal-remove-team-member.component.html',
  styleUrls: ['./modal-remove-team-member.component.scss']
})
export class ModalRemoveTeamMemberComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
