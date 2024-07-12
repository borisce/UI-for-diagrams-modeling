import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserBalanceChange } from '../model/user-balance-change';
import { Page } from '../model/page';

/**
 * Service to register user
 */
@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  /**
   * Register a user
   */
  public register(user) {
    return this.http.post(environment.baseUrl + '/auth/users', user);
  }

  /**
   * Delete a user
   */
  public delete() {
    return this.http.delete(environment.baseUrl + `/auth/users/`);
  }

  /**
   * Update a users account
   */
  public update(form) {
    return this.http.put(environment.baseUrl + `/auth/users/`, form);
  }

  /**
   * Get all existing users (info for ADMIN).
   */
  public getAllUsers() {
    return this.http.get(environment.baseUrl + '/auth/users/all');
  }

  /**
   * Get users roles (info for ADMIN).
   */
  public getUserRoles(uuid) {
    return this.http.get(environment.baseUrl + `/auth/users/roles/${uuid}`);
  }

  /**
   * Mark user activity
   * @param markedUser
   */
  public markUserAdmin(markedUser: any): any {
    return this.http.post(environment.baseUrl + '/admin_users/', markedUser);
  }

  /**
   * Get all user activity (info for ADMIN).
   */
  public getUserActivityAdmin(): any {
    return this.http.get(environment.baseUrl + '/admin_users/users');
  }

  /**
   * Change status of a user - active, inactive (info for ADMIN).
   */
  public changeAccountStatus(user: any): any {
    return this.http.put(environment.baseUrl + '/auth/users/suspend', user);
  }

  /**
   * Get all packages from DB
   */
  public getAllPackages(): any {
    return this.http.get(environment.baseUrl + '/packages/all');
  }

  /**
   * Update package
   */
  public updatePackage(form: any): any {
    return this.http.put(environment.baseUrl + '/packages/update', form);
  }

  /**
   * Change Role
   */
  public changeRole(form: any): any {
    return this.http.post(environment.baseUrl + '/auth/change/role', form);
  }

  /**
   * Remove Role
   */
  public removeRole(form: any): any {
    return this.http.post(environment.baseUrl + '/auth/remove/role', form);
  }

  /**
   * Delete specific user account
   */
  //  public deleteSpecificAccount(uuid: any) {
  //   return this.http.delete(environment.baseUrl + `/auth/users/${uuid}`);
  // }


  public getBalanceChanges(pageIndex: number, pageSize: number)
    : Observable<Page<UserBalanceChange>> {
    const url_params: string = `?page=${pageIndex || 0}&size=${pageSize || 10}`;
    return this.http.get<Page<UserBalanceChange>>
    (environment.baseUrl + `/auth/user/balance-changes` + url_params);
  }
}
