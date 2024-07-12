import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {RepositoryService} from './repository.service';
import {environment} from '../../../environments/environment';
import {LoginResponse} from 'src/app/api/models/login-response';
import {Router} from '@angular/router';
import {Organization} from 'src/app/api/models/organization';
import {of, Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {UserService} from 'src/app/core/service/user.service';
import {NewUser} from "../../api/models/new-user";
import {CartService} from "./cart.service";

/**
 * AuthenticationService is used to log user and get information about user. And storing this information.
 * in user.
 */
@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: NewUser | null = null;
  public currentOrganization: Organization | null = null;
  public repositoryService: RepositoryService;
  public cartService: CartService;
  @Output() public authenticationStatusChange: EventEmitter<any> = new EventEmitter<void>();
  private refreshTimer: Observable<number>;
  private refreshTimerSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {
  }

  public get loggedIn(): boolean {
    return this.currentUser != null;
  }

  /* Check if the current users role is ADMIN */
  public get isAdmin(): boolean {
    return this.currentUser.roles === 'ADMIN';
  }

  public get organization(): Organization | null {
    return this.currentOrganization === undefined || this.currentOrganization === null ?
      null : this.currentOrganization;
  }

  public set organization(organization: Organization) {
    this.currentOrganization = organization;
  }

  public get token(): string | null {
    const token: string | null = localStorage.getItem('token');
    return token != null && token.length > 0 ? token : null;
  }

  public get haveOwnerPermission(): boolean {
    if (this.organization === null) {
      return false;
    }
    return this.organization.owner === this.currentUser.uuid;
  }

  public init(): Promise<LoginResponse> {
    if (this.token != null) {
      return this.refreshUser();
    }
  }

  public async refreshUser(): Promise<LoginResponse> {
    return this.http.get<LoginResponse>(environment.baseUrl + '/auth/refresh-token')
      .pipe(
        map((data) => {
          localStorage.setItem('token', `${data.tokenType} ${data.token}`);
          this.currentUser = data.user;
          this.organization = data.organization;
          this.currentUser.organizationUUID = data.organization?.uuid;
          this.authenticationStatusChange.emit('authenticated');
          return data;
        }),
        catchError((err: any) => {
          //console.log(err);
          this.logout();
          return of(null);
        })
      )
      .toPromise();
  }

  /**
   * Loggin user with credentials
   * @param username - username
   * @param email - email
   * @param password - password
   */
  public login(username: string, email: string, password: string): any {
    return this.http
      .post<LoginResponse>(
        environment.baseUrl + '/auth/login',
        {username, email, password},
      )
      .pipe(
        map((data) => {
            this.currentUser = data.user;
            this.organization = data.organization;
            localStorage.setItem('token', `${data.tokenType} ${data.token}`);
            this.authenticationStatusChange.emit('authenticated');
            return data;
          },
          error => {
          }
        ));
  }

  public loginSuccessfull(from: any): Observable<any> {
    const userRoles: any = this.userService.getUserRoles(this.currentUser.uuid);
    userRoles.subscribe(res =>
      this.currentUser.roles = res[0]
    );

    // let todaysDate = new Date();
    // this.userService.markUserAdmin({
    //   "logged": true,
    //   "signed": false,
    //   "edited": false,
    //   "date": todaysDate
    // }).subscribe();

    return this.http.put(environment.baseUrl + `/auth/users/logged`, from);
  }

  /**
   * LogoutUser - delete all data from local storage
   */
  public logout(): void {
    this.http.get(environment.baseUrl + '/auth/logout').toPromise().finally(() => {
      this.authenticationStatusChange.emit('unauthenticated');
      this.clearSession();
      console.log("OK");
    });
  }

  public update(form: any): any {
    if (!form.isAdmin) {
      if (form.firstName != null) {
        this.currentUser.firstName = form.firstName;
      }
      if (form.lastName != null) {
        this.currentUser.lastName = form.lastName;
      }
      if (form.email != null) {
        this.currentUser.email = form.email;
      }
    }
  }

  public getUserDetails(uuid: string): any {
    return this.http.get(environment.baseUrl + `/auth/users/${uuid}`);
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('repository');
    localStorage.removeItem('myDir');
    localStorage.removeItem('editedFile');
    localStorage.removeItem('pathToFile');
    if (this.cartService !== undefined) {
      this.cartService.clearCartItems();
    }
    if (this.repositoryService !== undefined) {
      this.repositoryService.clearCurrentRepo();
    }

    this.currentUser = null;
    this.organization = undefined;
    if (this.refreshTimerSubscription) {
      this.refreshTimerSubscription.unsubscribe();
    }
    this.refreshTimerSubscription = null;
    this.refreshTimer = null;
    this.router.navigate(['/']);
  }
}
