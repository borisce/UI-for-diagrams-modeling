/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ExtractedElements } from '../models/extracted-elements';
import { SourceCode } from '../models/source-code';

@Injectable({
  providedIn: 'root',
})
export class ExistingModuleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation loadExistingModule
   */
  static readonly LoadExistingModulePath = '/visualization/loadModule';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadExistingModule()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  loadExistingModule$Response(params?: {


    /**
     * Source code to parse and visualize module
     */
    body?: SourceCode
  }): Observable<StrictHttpResponse<Array<ExtractedElements>>> {

    const rb = new RequestBuilder(this.rootUrl, ExistingModuleService.LoadExistingModulePath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ExtractedElements>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loadExistingModule$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  loadExistingModule(params?: {


    /**
     * Source code to parse and visualize module
     */
    body?: SourceCode
  }): Observable<Array<ExtractedElements>> {

    return this.loadExistingModule$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ExtractedElements>>) => r.body as Array<ExtractedElements>)
    );
  }

}
