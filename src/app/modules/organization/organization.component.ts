import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthenticationService} from 'src/app/core/service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  public organizationName: string;

  constructor(private router: Router,
              public authenticationService: AuthenticationService) {
  }

  public ngOnInit(): void {
    if (!this.authenticationService.organization) {
      this.router.navigate(['/my-repos']);
    } else {
      this.organizationName = this.authenticationService.organization.name;
    }
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }

}
