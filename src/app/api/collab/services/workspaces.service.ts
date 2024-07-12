/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InitFromGit } from '../models/init-from-git';
import { InitFromZip } from '../models/init-from-zip';
import { Success } from '../models/success';


/**
 * Operations with whole collaboration workspaces. More operations may be available by modifying shareDB repo metadata directly.
 */
@Injectable({
  providedIn: 'root',
})
export class WorkspacesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation initFromGit
   */
  static readonly InitFromGitPath = '/workspace/{repoId}/initFromGit';

  /**
   * Path part for operation initWorkspace
   */
  static readonly InitWorkspacePath = '/workspace/{repoId}/init';
  /**
   * Path part for operation deleteWorkspace
   */
  static readonly DeleteWorkspacePath = '/workspace/{repoId}';
  /**
   * Path part for operation deleteWorkspace
   */
  static readonly FetchAndPullPath = '/workspace/{repoId}/fetchAndPull';

  /**
   * This method fetches the remote repository and loads all files and branches into the collaboration context. Any existing repository with the same name and author will be replaced, as well as any existing collaborative documents.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetchAndPull()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  fetchAndPull$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;


    /**
     * Information required to clone and initialize a remote repo
     */
    body: InitFromGit
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, WorkspacesService.FetchAndPullPath, 'post');
    if (params) {

      rb.path('repoId', params.repoId);
      rb.header('authorization', params.authorization);

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Success>;
      })
    );
  }

  /**
   * This method clones the remote repository and loads all files and branches into the collaboration context. Any existing repository with the same name and author will be replaced, as well as any existing collaborative documents.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `initFromGit()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  initFromGit$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;


    /**
     * Information required to clone and initialize a remote repo
     */
    body: InitFromGit
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, WorkspacesService.InitFromGitPath, 'post');
    if (params) {

      rb.path('repoId', params.repoId);
      rb.header('authorization', params.authorization);

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Success>;
      })
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `initWorkspace()` instead.
   *
   * This method sends `multipart/form-data` and handles response body of type `multipart/form-data`
   */
  initWorkspace$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body?: InitFromZip
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, WorkspacesService.InitWorkspacePath, 'post');
    if (params) {

      rb.path('repoId', params.repoId);
      rb.header('authorization', params.authorization);

      rb.body(params.body, 'multipart/form-data');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Success>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `initWorkspace$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles response body of type `multipart/form-data`
   */
  initWorkspace(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body?: InitFromZip
  }): Observable<Success> {    
    return this.initWorkspace$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

  /**
   * This method clones the remote repository and loads all files and branches into the collaboration context. Any existing repository with the same name and author will be replaced, as well as any existing collaborative documents.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `initFromGit$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  initFromGit(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;


    /**
     * Information required to clone and initialize a remote repo
     */
    body: InitFromGit
  }): Observable<Success> {

    return this.initFromGit$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

  /**
   * This method fetches the remote repository and loads all files and branches into the collaboration context. Any existing repository with the same name and author will be replaced, as well as any existing collaborative documents.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `fetchAndPull$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  fetchAndPull(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;


    /**
     * Information required to clone and initialize a remote repo
     */
    body: InitFromGit
  }): Observable<Success> {

    return this.fetchAndPull$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteWorkspace()` instead.
   *
   * This method doesn't expect any response body
   */
  deleteWorkspace$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, WorkspacesService.DeleteWorkspacePath, 'delete');
    if (params) {

      rb.path('repoId', params.repoId);
      rb.header('authorization', params.authorization);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Success>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteWorkspace$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  deleteWorkspace(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

  }): Observable<Success> {

    return this.deleteWorkspace$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

}