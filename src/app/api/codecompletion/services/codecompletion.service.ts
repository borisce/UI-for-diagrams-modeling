/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PredictionResponse } from '../models/prediction-response';
import { Prediction } from '../models/prediction';


/**
 * Git operations on workspace. More may be available by modyfiing shareDB repo metadata.
 */
@Injectable({
  providedIn: 'root',
})
export class CodecompletionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation gitRepoIdCommitPost
   */
  static readonly CompletionPredictionPostPath = '/code-completion_';

  /**
   * Commit changes in selected repository
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gitRepoIdCommitPost()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  completionPredictionPost(params: {
    completion_id: string,
    body: Prediction
  }): Observable<StrictHttpResponse<PredictionResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CodecompletionService.CompletionPredictionPostPath+params.completion_id, 'post');
    if (params) {

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PredictionResponse>;
      })
    );
  }

}
