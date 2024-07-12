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
import { IdentifiedSubmodules } from '../models/identified-submodules';
import { PackageItem } from '../models/package-item';
import { SourceCode } from '../models/source-code';
import { VisualizationData } from '../models/visualization-data';

@Injectable({
  providedIn: 'root',
})
export class CodeToDiaExtractService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation parsePackageInformation
   */
  static readonly ParsePackageInformationPath = '/parse/getPackageData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `parsePackageInformation()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  parsePackageInformation$Response(params?: {


    /**
     * SystemVerilog package source code
     */
    body?: SourceCode
  }): Observable<StrictHttpResponse<Array<PackageItem>>> {

    const rb = new RequestBuilder(this.rootUrl, CodeToDiaExtractService.ParsePackageInformationPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PackageItem>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `parsePackageInformation$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  parsePackageInformation(params?: {


    /**
     * SystemVerilog package source code
     */
    body?: SourceCode
  }): Observable<Array<PackageItem>> {

    return this.parsePackageInformation$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PackageItem>>) => r.body as Array<PackageItem>)
    );
  }

  /**
   * Path part for operation parseForVisualization
   */
  static readonly ParseForVisualizationPath = '/parse/getVisualizationData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `parseForVisualization()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  parseForVisualization$Response(params?: {


    /**
     * SystemVerilog source code
     */
    body?: SourceCode
  }): Observable<StrictHttpResponse<Array<ExtractedElements>>> {

    const rb = new RequestBuilder("localhost:8080/", CodeToDiaExtractService.ParseForVisualizationPath, 'post');
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
   * To access the full response (for headers, for example), `parseForVisualization$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  parseForVisualization(params?: {


    /**
     * SystemVerilog source code
     */
    body?: SourceCode
  }): Observable<Array<ExtractedElements>> {

    return this.parseForVisualization$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ExtractedElements>>) => r.body as Array<ExtractedElements>)
    );
  }

  /**
   * Path part for operation parseForSubDiaVisualization
   */
  static readonly ParseForSubDiaVisualizationPath = '/parse/getDataForSubDiagram';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `parseForSubDiaVisualization()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  parseForSubDiaVisualization$Response(params?: {


    /**
     * SystemVerilog source code and identified submodule interfaces
     */
    body?: VisualizationData
  }): Observable<StrictHttpResponse<ExtractedElements>> {

    const rb = new RequestBuilder(this.rootUrl, CodeToDiaExtractService.ParseForSubDiaVisualizationPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ExtractedElements>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `parseForSubDiaVisualization$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  parseForSubDiaVisualization(params?: {


    /**
     * SystemVerilog source code and identified submodule interfaces
     */
    body?: VisualizationData
  }): Observable<ExtractedElements> {

    return this.parseForSubDiaVisualization$Response(params).pipe(
      map((r: StrictHttpResponse<ExtractedElements>) => r.body as ExtractedElements)
    );
  }

  /**
   * Path part for operation parseForSubModuleInteraceRecognition
   */
  static readonly ParseForSubModuleInteraceRecognitionPath = '/parse/getSubModules';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `parseForSubModuleInteraceRecognition()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  parseForSubModuleInteraceRecognition$Response(params?: {


    /**
     * SystemVerilog source code
     */
    body?: SourceCode
  }): Observable<StrictHttpResponse<Array<IdentifiedSubmodules>>> {
    const rb = new RequestBuilder("http://localhost:8080/api/parser", CodeToDiaExtractService.ParseForSubModuleInteraceRecognitionPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IdentifiedSubmodules>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `parseForSubModuleInteraceRecognition$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  parseForSubModuleInteraceRecognition(params?: {


    /**
     * SystemVerilog source code
     */
    body?: SourceCode
  }): Observable<Array<IdentifiedSubmodules>> {

    return this.parseForSubModuleInteraceRecognition$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IdentifiedSubmodules>>) => r.body as Array<IdentifiedSubmodules>)
    );
  }

}
