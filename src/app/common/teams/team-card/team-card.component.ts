import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from 'src/app/core/service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  @Input('uuid') public uuid: string;
  @Input('name') public name: string;
  @Input('lastModified') public lastModified: string;
  @Input('lastModifiedBy') public lastModifiedBy: string;
  @Input('ownedBy') public ownedBy: string;

  @Output() selected = new EventEmitter<string>();

  @Input('checked') public checked: boolean = false;

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    const lastModifiedString = this.lastModified;
    const lastModifiedDate = new Date(lastModifiedString);
    const locale = "sk-SK";
    this.lastModified = lastModifiedDate.toLocaleDateString(locale) + " " + lastModifiedDate.toLocaleTimeString(locale);
    this.getUser();
  }

  private async getUser() {
    const response = await this.auth.getUserDetails(this.ownedBy).toPromise();
    this.ownedBy = response.firstName + ' ' + response.lastName;
  }

  /**
   * Event emiter handler
   */
  onTeamClick() {
    this.selected.emit(this.uuid);
  }
}
