import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { NewUser } from '../models/new-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getUsers
   */
  static readonly GetUsersPath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any response body
   */
  getUsers$Response(params?: {

    /**
     * offset of results to return
     */
    offset?: number;

    /**
     * maximum number of results to return
     */
    limit?: number;

  }): Observable<StrictHttpResponse<Array<User>>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetUsersPath, 'get');
    if (params) {
      rb.query('offset', params.offset);
      rb.query('limit', params.limit);
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<User>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any response body
   */
   getUsers(params?: {

    /**
     * offset of results to return
     */
    offset?: number;

    /**
     * maximum number of results to return
     */
    limit?: number;

  }): Observable<Array<User>> {
    return this.getUsers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<User>>) => r.body as Array<User>)
    );
  }


  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  createUser$Response(params: {

    /**
     * User to create
     */
    body: NewUser
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.CreateUserPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  createUser(params: {

    /**
     * User to create
     */
    body: NewUser
  }): Observable<User> {
    return this.createUser$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation getUserByEmail
   */
  static readonly GetUserByEmailPath = '/users/email/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserByEmail()` instead.
   *
   * This method doesn't expect any response body
   */
  getUserByEmail$Response(params: {

    /**
     * Email of the user to fetch
     */
    email: string;

  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetUserByEmailPath, 'get');
    if (params) {
      rb.path('email', params.email);
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserByEmail$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getUserByEmail(params: {

    /**
     * Email of the user to fetch
     */
    email: string;

  }): Observable<User> {

    return this.getUserByEmail$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation getUser
   */
  static readonly GetUserPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUser()` instead.
   *
   * This method doesn't expect any response body
   */
  getUser$Response(params: {

    /**
     * Id of the user to fetch
     */
    id: number;

  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetUserPath, 'get');
    if (params) {
      rb.path('id', params.id);
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUser$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getUser(params: {

    /**
     * Id of the user to fetch
     */
    id: number;

  }): Observable<User> {

    return this.getUser$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation updateUser
   */
  static readonly UpdateUserPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  updateUser$Response(params: {

    /**
     * ID of the user to update
     */
    id: number;

    /**
     * User to update
     */
    body: NewUser
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UpdateUserPath, 'put');
    if (params) {
      rb.path('id', params.id);
      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  updateUser(params: {

    /**
     * ID of the user to update
     */
    id: number;

    /**
     * User to update
     */
    body: NewUser
  }): Observable<User> {

    return this.updateUser$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation activateUser
   */
  static readonly ActivateUserPath = '/users/{id}/activate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateUser()` instead.
   *
   * This method doesn't expect any response body
   */
  activateUser$Response(params: {

    /**
     * ID of the user to activate
     */
    id: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ActivateUserPath, 'put');
    if (params) {
      rb.path('id', params.id);
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `activateUser$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  activateUser(params: {

    /**
     * ID of the user to activate
     */
    id: number;

  }): Observable<void> {

    return this.activateUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deactivateUser
   */
  static readonly DeactivateUserPath = '/users/{id}/deactivate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deactivateUser()` instead.
   *
   * This method doesn't expect any response body
   */
  deactivateUser$Response(params: {

    /**
     * ID of the user to deactivate
     */
    id: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.DeactivateUserPath, 'delete');
    if (params) {
      rb.path('id', params.id);
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deactivateUser$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  deactivateUser(params: {

    /**
     * ID of the user to deactivate
     */
    id: number;

  }): Observable<void> {

    return this.deactivateUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
