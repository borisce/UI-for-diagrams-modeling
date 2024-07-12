import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { NewRole } from '../models/new-role';
import { RoleWithId } from '../models/role-with-id';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findRoles
   */
  static readonly FindRolesPath = '/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findRoles()` instead.
   *
   * This method doesn't expect any response body
   */
  findRoles$Response(params?: {

    /**
     * Offset of results to return.
     */
    offset?: number;

    /**
     * Maximum number of results to return.
     */
    limit?: number;

  }): Observable<StrictHttpResponse<Array<RoleWithId>>> {

    const rb = new RequestBuilder(this.rootUrl, RoleService.FindRolesPath, 'get');
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
        return r as StrictHttpResponse<Array<RoleWithId>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findRoles$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  findRoles(params?: {

    /**
     * Offset of results to return.
     */
    offset?: number;

    /**
     * Maximum number of results to return.
     */
    limit?: number;

  }): Observable<Array<RoleWithId>> {

    return this.findRoles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RoleWithId>>) => r.body as Array<RoleWithId>)
    );
  }

  /**
   * Path part for operation createRole
   */
  static readonly CreateRolePath = '/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRole()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  createRole$Response(params: {

    /**
     * Role to create.
     */
    body: NewRole
  }): Observable<StrictHttpResponse<RoleWithId>> {

    const rb = new RequestBuilder(this.rootUrl, RoleService.CreateRolePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RoleWithId>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createRole$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  createRole(params: {

    /**
     * Role to create.
     */
    body: NewRole
  }): Observable<RoleWithId> {

    return this.createRole$Response(params).pipe(
      map((r: StrictHttpResponse<RoleWithId>) => r.body as RoleWithId)
    );
  }

  /**
   * Path part for operation getRoleByName
   */
  static readonly GetRoleByNamePath = '/roles/name/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRoleByName()` instead.
   *
   * This method doesn't expect any response body
   */
  getRoleByName$Response(params: {

    /**
     * Name of the role to fetch.
     */
    name: string;

  }): Observable<StrictHttpResponse<RoleWithId>> {

    const rb = new RequestBuilder(this.rootUrl, RoleService.GetRoleByNamePath, 'get');
    if (params) {

      rb.path('name', params.name);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RoleWithId>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRoleByName$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getRoleByName(params: {

    /**
     * Name of the role to fetch.
     */
    name: string;

  }): Observable<RoleWithId> {

    return this.getRoleByName$Response(params).pipe(
      map((r: StrictHttpResponse<RoleWithId>) => r.body as RoleWithId)
    );
  }

  /**
   * Path part for operation getRole
   */
  static readonly GetRolePath = '/roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRole()` instead.
   *
   * This method doesn't expect any response body
   */
  getRole$Response(params: {

    /**
     * Id of the role to fetch.
     */
    id: number;

  }): Observable<StrictHttpResponse<RoleWithId>> {

    const rb = new RequestBuilder(this.rootUrl, RoleService.GetRolePath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RoleWithId>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRole$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getRole(params: {

    /**
     * Id of the role to fetch.
     */
    id: number;

  }): Observable<RoleWithId> {

    return this.getRole$Response(params).pipe(
      map((r: StrictHttpResponse<RoleWithId>) => r.body as RoleWithId)
    );
  }

  /**
   * Path part for operation updateRole
   */
  static readonly UpdateRolePath = '/roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRole()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  updateRole$Response(params: {

    /**
     * Id of the role to update.
     */
    id: number;

    /**
     * Role to update.
     */
    body: NewRole
  }): Observable<StrictHttpResponse<RoleWithId>> {

    const rb = new RequestBuilder(this.rootUrl, RoleService.UpdateRolePath, 'put');
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
        return r as StrictHttpResponse<RoleWithId>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateRole$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  updateRole(params: {

    /**
     * Id of the role to update.
     */
    id: number;

    /**
     * Role to update.
     */
    body: NewRole
  }): Observable<RoleWithId> {

    return this.updateRole$Response(params).pipe(
      map((r: StrictHttpResponse<RoleWithId>) => r.body as RoleWithId)
    );
  }

  /**
   * Path part for operation deleteRole
   */
  static readonly DeleteRolePath = '/roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRole()` instead.
   *
   * This method doesn't expect any response body
   */
  deleteRole$Response(params: {

    /**
     * Id of the role to delete.
     */
    id: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RoleService.DeleteRolePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteRole$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  deleteRole(params: {

    /**
     * Id of the role to delete.
     */
    id: number;

  }): Observable<void> {
    return this.deleteRole$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
