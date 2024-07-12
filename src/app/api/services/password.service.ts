import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { InitPasswordResetRequest } from '../models/init-password-reset-request';
import { PasswordResetRequest } from '../models/password-reset-request';

@Injectable({
  providedIn: 'root',
})
export class PasswordService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createPasswordResetRequest
   */
  static readonly CreatePasswordResetRequestPath = '/reset';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPasswordResetRequest()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`.
   */
  createPasswordResetRequest$Response(params?: {
    body?: InitPasswordResetRequest   // PasswordRequest to create
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, PasswordService.CreatePasswordResetRequestPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `createPasswordResetRequest$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`.
   */
  createPasswordResetRequest(params?: {
    body?: InitPasswordResetRequest   // PasswordRequest to create
  }): Observable<void> {
    return this.createPasswordResetRequest$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation processPasswordResetRequest
   */
  static readonly ProcessPasswordResetRequestPath = '/reset/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `processPasswordResetRequest()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  processPasswordResetRequest$Response(params: {
    id: string;                   // ID of the Password Reset Request
    body: PasswordResetRequest;   // contains a new Password to be set to a user with email provided earlier in the /reset POST method
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PasswordService.ProcessPasswordResetRequestPath, 'put');
    if (params) {
      rb.path('id', params.id);
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `processPasswordResetRequest$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  processPasswordResetRequest(params: {
    id: string;                 // ID of the Password Reset Request
    body: PasswordResetRequest  // contains a new Password to be set to a user with email provided earlier in the /reset POST method
  }): Observable<void> {
    return this.processPasswordResetRequest$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
