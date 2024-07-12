import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Invitation} from 'src/app/api/models/invitation';
import {InvitationDecision} from 'src/app/api/models/invitation-decision';
import {AuthenticationService} from 'src/app/core/service';
import {OrganizationMemberManagementService} from 'src/app/core/service/organization.service';
import {ModalOpenInvitationComponent} from 'src/app/modal/modal-open-invitation/modal-open-invitation.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public section: String = "inbox";
  public selectedFilter: String = "";
  public all_invitations: Invitation[] = [];
  public loaded_inbox_invitations: Invitation[] = [];
  public loaded_sent_invitations: Invitation[] = [];
  public hasMsg: boolean = false;
  public hasPending: boolean = false;
  public hasAccepted: boolean = false;
  public hasRejected: boolean = false;
  public hasOutgoing: boolean = false;
  public loading: boolean = false;
  public decisionMsg: InvitationDecision;
  public pending_invitations: Invitation[] = [];
  public accepted_invitations: Invitation[] = [];
  public rejected_invitations: Invitation[] = [];
  public outgoing_invitations: Invitation[] = [];
  public initInbox: boolean = true;
  public initSent: boolean = true;
  public interaction: boolean = false;
  public time_out;

  constructor(
    private dialog: MatDialog,
    private invitationService: OrganizationMemberManagementService,
    private authenticationService: AuthenticationService,
  ) {
    this.all_invitations = [];
    this.loaded_inbox_invitations = [];
    this.loaded_sent_invitations = [];
    this.pending_invitations = [];
    this.accepted_invitations = [];
    this.rejected_invitations = [];
    this.outgoing_invitations = [];
  }

  ngOnInit(): void {
    this.showPage();
  }

  public showPage() {

    if (!this.authenticationService.loggedIn) {
      clearTimeout(this.time_out);
      return;
    }

    console.log("alive...");

    this.invitationService.getUserSpecificInvitations().subscribe(res => {
      if (Object.keys(res).length) {

        this.loaded_inbox_invitations = Object.values(res);
        this.resetInbox();
        this.hasMsg = true;
        this.initInbox = false;

        for (let inv of this.loaded_inbox_invitations) {
          let date = new Date(inv[4]);
          let currentDate = new Date();

          let customDate = date.getDate() + ". " + (date.getMonth() + 1) + ".";
          let customCurrentDate = currentDate.getDate() + ". " + (currentDate.getMonth() + 1) + ".";
          let time = ("0" + (date.getHours() + 1)).slice(-2) + ":" + ("0" + (date.getMinutes() + 1)).slice(-2);

          if (customDate == customCurrentDate) {
            inv[4] = time;
          } else {
            inv[4] = customDate;
          }

          this.all_invitations.push(inv);

          if (inv[1] === 'PENDING') {
            this.pending_invitations.push(inv);
            this.hasPending = true;
          } else if (inv[1] === 'ACCEPTED') {
            this.accepted_invitations.push(inv);
            this.hasAccepted = true;
          } else if (inv[1] === 'REJECTED') {
            this.rejected_invitations.push(inv);
            this.hasRejected = true;
          }
        }
      }
    });

    this.invitationService.getOutgoingInvitations().subscribe(res => {
      if (Object.keys(res).length) {

        this.loaded_sent_invitations = Object.values(res);
        this.resetSent();
        this.hasOutgoing = true;
        this.initSent = false;

        for (let inv of this.loaded_sent_invitations) {
          let date = new Date(inv[4]);
          let currentDate = new Date();

          let customDate = date.getDate() + ". " + (date.getMonth() + 1) + ".";
          let customCurrentDate = currentDate.getDate() + ". " + (currentDate.getMonth() + 1) + ".";
          let time = ("0" + (date.getHours() + 1)).slice(-2) + ":" + ("0" + (date.getMinutes() + 1)).slice(-2);

          if (customDate == customCurrentDate) {
            inv[4] = time;
          } else {
            inv[4] = customDate;
          }
          this.outgoing_invitations.push(inv);
        }
      }
    })

    this.time_out = setTimeout(() => {
      if (this.interaction) {
        return;
      }
      this.showPage();
    }, 6000);
  }

  public onChangeSection(event: any) {
    this.section = event;
    this.selectedFilter = "";
  }

  public onChangeFilter(event: any) {
    this.selectedFilter = event;
    this.section = "";
  }

  public resetInbox() {
    this.all_invitations = [];
    this.pending_invitations = [];
    this.accepted_invitations = [];
    this.rejected_invitations = [];
    this.hasMsg = false;
    this.hasPending = false;
    this.hasAccepted = false;
    this.hasRejected = false;
  }

  public resetSent() {
    this.outgoing_invitations = [];
    this.hasOutgoing = false;
  }

  public reloadPage() {
    this.resetInbox();
    this.resetSent();
    this.initSent = true;
    this.initInbox = true;
    this.interaction = false;
    this.showPage();
  }

  public openSelectedInvitationDialog(inv: any, canEdit: boolean, type: String): void {
    this.interaction = true;
    clearTimeout(this.time_out);
    this.dialog.open(ModalOpenInvitationComponent, {
      data: {inv, canEdit, type}
    }).afterClosed().subscribe(result => {
      if (type === 'rec' && result === true) {
        this.loading = true;

        this.decisionMsg = {
          organizationId: inv[2],
          invitationId: inv[3],
          decision: result
        }

        this.invitationService.decideInvitation(this.decisionMsg).subscribe(
          data => {
            //const organization = data as Organization;
            //this.authenticationService.organization = organization;
            this.authenticationService.refreshUser();
            this.loading = false;
            this.reloadPage();
            this.dialog.closeAll();
          },
          error1 => {
            this.loading = false;
          }
        );
      } else if (type === 'rec' && result === false) {
        this.loading = true;

        this.decisionMsg = {
          organizationId: inv[2],
          invitationId: inv[3],
          decision: result
        }

        this.invitationService.decideInvitation(this.decisionMsg).subscribe(
          data => {
            this.loading = false;
            this.reloadPage();
            this.dialog.closeAll();
          },
          error1 => {
            this.loading = false;
          }
        );
      } else if (type === 'sent' && result === true) {
        this.invitationService.deleteInvitation(inv[7]).subscribe(res => {
          this.dialog.closeAll();
          this.reloadPage();
        });
      }
      this.reloadPage()
    });
  }

}
