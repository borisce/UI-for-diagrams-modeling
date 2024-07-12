import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ModalCreateOrganizationComponent
} from 'src/app/modal/modal-create-organization/modal-create-organization.component';
import { AuthenticationService } from '../../core/service';
import { UserService } from 'src/app/core/service/user.service';
import { NewUser } from 'src/app/api/models';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public userRoles: any;
  public isAdmin: boolean = false;
  public user: NewUser;

  @Output() public sidenavToggle: EventEmitter<any> = new EventEmitter();
  public cartItemAddedMessageShow: boolean = false;
  private cartItemAddedMessageShowTimeout: ReturnType<typeof setTimeout> = null;

  constructor(
    public authenticationService: AuthenticationService,
    public userService: UserService,
    public cartService: CartService,
    private dialog: MatDialog,
    public router: Router,
  ) {
  }

  public ngOnInit(): void {
    if (this.authenticationService.loggedIn) {
      this.getAuth();
    }
    this.cartService.itemAdded.subscribe(() => {
      this.cartItemAddedMessageShow = true;
      if (this.cartItemAddedMessageShowTimeout !== null) {
        clearTimeout(this.cartItemAddedMessageShowTimeout);
        this.cartItemAddedMessageShowTimeout = null;
      }
      this.cartItemAddedMessageShowTimeout = setTimeout(() => {
        this.cartItemAddedMessageShow = false;
      }, 1500);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartItemAddedMessageShowTimeout !== null) {
      clearTimeout(this.cartItemAddedMessageShowTimeout);
      this.cartItemAddedMessageShowTimeout = null;
    }
    this.cartService.itemAdded.unsubscribe();
  }


  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  /**
   * Get roles at login. Check if the user is ADMIN.
   */
  public async getAuth(): Promise<any> {
    const user: NewUser = this.authenticationService.currentUser;
    this.userRoles = await this.userService.getUserRoles(user.uuid).toPromise();
    if (this.userRoles.includes('ADMIN')) {
      this.isAdmin = true;
    }
  }

  public createOrganizationdialog(): void {
    this.dialog.open(ModalCreateOrganizationComponent, {});
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  public scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
  }
}
