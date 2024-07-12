/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Commit } from '../models/commit';
import { MergeBranch } from '../models/merge-branch';
import { NewBranch } from '../models/new-branch';
import { PushPull } from '../models/push-pull';
import { Success } from '../models/success';


/**
 * Git operations on workspace. More may be available by modyfiing shareDB repo metadata.
 */
@Injectable({
  providedIn: 'root',
})
export class GitService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation gitRepoIdCommitPost
   */
  static readonly GitRepoIdCommitPostPath = '/git/{repoId}/commit';

  /**
   * Commit changes in selected repository
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gitRepoIdCommitPost()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitRepoIdCommitPost$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body: Commit
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, GitService.GitRepoIdCommitPostPath, 'post');
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

  gitRepoIdStatusMatrixGet(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;
  }): Observable<Success> {

    return this.gitRepoIdStatusMatrixGet$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

  /**
   * Path part for operation gitRepoIdStatusMatrix
   */
  static readonly GitRepoIdStatusMatrix = '/git/{repoId}/statusMatrix';

  /**
   * Retrieves status matrix from selected repository
   *
   *
   * This method sends GET and handles response body of type `application/json`
   */
  gitRepoIdStatusMatrixGet$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;
    /**
     * Auth token
     */
    authorization: string;
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, GitService.GitRepoIdStatusMatrix, 'get');
    if (params) {

      rb.path('repoId', params.repoId);
      rb.path('authorization', params.authorization);
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
   * Commit changes in selected repository
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gitRepoIdCommitPost$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitRepoIdCommitPost(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body: Commit & {
      github_token: string;
    }
  }): Observable<Success> {

    return this.gitRepoIdCommitPost$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

  /**
   * Path part for operation gitRepoIdPushPost
   */
  static readonly GitRepoIdPushPostPath = '/git/{repoId}/push';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gitRepoIdPushPost()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitRepoIdPushPost$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body: PushPull
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, GitService.GitRepoIdPushPostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gitRepoIdPushPost$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitRepoIdPushPost(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body: PushPull
  }): Observable<Success> {

    return this.gitRepoIdPushPost$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

  /**
   * Path part for operation gitRepoIdPullPost
   */
  static readonly GitRepoIdPullPostPath = '/git/{repoId}/pull';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gitRepoIdPullPost()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitRepoIdPullPost$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body: PushPull
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, GitService.GitRepoIdPullPostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gitRepoIdPullPost$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitRepoIdPullPost(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body: PushPull
  }): Observable<Success> {

    return this.gitRepoIdPullPost$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

  /**
   * Path part for operation gitRepoIdBranchPost
   */
  static readonly GitRepoIdBranchPostPath = '/git/{repoId}/branch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gitRepoIdBranchPost()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitRepoIdBranchPost$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body: NewBranch
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, GitService.GitRepoIdBranchPostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gitRepoIdBranchPost$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitRepoIdBranchPost(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body: NewBranch
  }): Observable<Success> {

    return this.gitRepoIdBranchPost$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

  /**
   * Path part for operation gitMerge
   */
  static readonly GitMergePath = '/git/{repoId}/branch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gitMerge()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitMerge$Response(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body?: MergeBranch
  }): Observable<StrictHttpResponse<Success>> {

    const rb = new RequestBuilder(this.rootUrl, GitService.GitMergePath, 'patch');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gitMerge$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  gitMerge(params: {

    /**
     * ID of the repo
     */
    repoId: string;

    /**
     * Auth token
     */
    authorization: string;

    body?: MergeBranch
  }): Observable<Success> {

    return this.gitMerge$Response(params).pipe(
      map((r: StrictHttpResponse<Success>) => r.body as Success)
    );
  }

}
