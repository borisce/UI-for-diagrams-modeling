import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalCreateOrganizationComponent } from 'src/app/modal/modal-create-organization/modal-create-organization.component';
import { AuthenticationService } from '../../../core/service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  @Output() public sidenavClose = new EventEmitter();

  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
  }

  public createOrganizationdialog(): void {
    this.dialog.open(ModalCreateOrganizationComponent, {
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
