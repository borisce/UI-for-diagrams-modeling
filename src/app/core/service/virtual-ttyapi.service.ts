import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Param_descriptionContext } from 'src/app/modules/editor/system_verilog/syntax-check/ANTLR/SysVerilogHDLParser';
import { environment } from 'src/environments/environment';
import { ApiTTYExistingResponse } from '../model/api-ttyexistingresponse';
import { ApiTTYResponse } from '../model/api-ttyresponse';
import { Observable } from "rxjs";
import { UUID } from 'antlr4ts/misc';

@Injectable({
  providedIn: 'root'
})
export class VirtualTTYapiService {

  public projectId: string;
  public userId: string;

  constructor(private httpClient: HttpClient) {
  }

  public async createTTYSession(projectId: string, userId: string): Promise<ApiTTYResponse> {
    const httpOptions = {

      params: new HttpParams()
        .set('repositoryId', projectId)
        .set('user', userId)
    }
    this.projectId = projectId;
    this.userId = userId;
    const url = environment.baseUrl + '/simulator/simulation-env';
    const req = await this.httpClient.put<ApiTTYResponse>(url, null, httpOptions).toPromise();
    return req;
  }

  public async createTTYSynthetizationSession(projectId: string, userId: string, endStep: string, technology: string): Promise<ApiTTYResponse> {
    const httpOptions = {

      params: new HttpParams()
        .set('repositoryId', projectId)
        .set('user', userId)
        .set('stopAt', endStep)
        .set('technology', technology)
    }
    this.projectId = projectId;
    this.userId = userId;
    const url = environment.baseUrl + '/simulator/synthesis-env';
    const req = await this.httpClient.put<ApiTTYResponse>(url, null, httpOptions).toPromise();
    return req;
  }

  public async startTTYSynthetizationSession(containerId: string): Promise<ApiTTYResponse> {
    const httpOptions = {
      params: new HttpParams()
        .set('containerId', containerId)
        .set('state', 'running')
    }
    const req = await this.httpClient.patch<ApiTTYResponse>(environment.baseUrl + '/simulator/synthesis-env', null, httpOptions).toPromise();
    return req;
  }

  public async startTTYSession(containerId: string): Promise<ApiTTYResponse> {
    const httpOptions = {
      params: new HttpParams()
        .set('containerId', containerId)
        .set('state', 'running')
    }
    const req = await this.httpClient.patch<ApiTTYResponse>(environment.baseUrl + '/simulator/simulation-env', null, httpOptions).toPromise();
    return req;
  }

  public async killTTYSession(containerId: string): Promise<ApiTTYResponse> {
    const httpOptions = {
      params: new HttpParams()
        .set('containerId', containerId)
        .set('state', 'killed')
    }
    const req = await this.httpClient.patch<ApiTTYResponse>(environment.baseUrl + '/simulator/simulation-env', null, httpOptions).toPromise();
    return req;
  }

  public async deleteTTYSession(containerId: string): Promise<ApiTTYResponse> {
    const httpOptions = {
      params: new HttpParams()
        .set('containerId', containerId)
    }
    const req = await this.httpClient.delete<ApiTTYResponse>(environment.baseUrl + '/simulator/simulation-env', httpOptions).toPromise();
    return req;
  }

  public async getExistingTTYSession(projectId: string): Promise<ApiTTYExistingResponse[]> {
    const httpOptions = {
      params: new HttpParams()
        .set('repositoryId', projectId)
    }
    const req = await this.httpClient.get<ApiTTYExistingResponse[]>(environment.baseUrl + '/simulator/simulation-env', httpOptions).toPromise();
    return req;
  }

  public async getExistingSynthesisTTYSession(projectId: string): Promise<ApiTTYExistingResponse[]> {
    const httpOptions = {
      params: new HttpParams()
        .set('repositoryId', projectId)
    }
    const req = await this.httpClient.get<ApiTTYExistingResponse[]>(environment.baseUrl + '/simulator/synthesis-env', httpOptions).toPromise();
    return req;
  }

  public async getFile(containerId: string, filePath: string): Promise<any> {
    const params = new HttpParams()
      .set('fileLocation', filePath)
      .set('containerId', containerId.toString());

    const req = await this.httpClient.get(environment.baseUrl + '/simulator/waveform', {
      params: params,
      responseType: 'text'
    }).toPromise();
    return req;
  }

  /**
   * Start simulation in container
   */
  public startSimulation(containerId: string, testNumber = null): Observable<object> {
    return this.httpClient.post(
      environment.baseUrl + `/simulator/simulation-start/?containerId=${containerId}&testNumber=${testNumber}`,
      {}
    );
  }

  public startSynthesis(containerId: string, endStep: String): Observable<object> {
    return this.httpClient.post(
      environment.baseUrl + '/simulator/synthesis-start/?containerId=' + containerId + '&stopAt=' + endStep,
      {}
    );
  }

  /**
   * Get container log
   */
  public getLog(containerId: string, since: number): Observable<HttpResponse<string>> {
    let params: HttpParams = new HttpParams();
    params = params.set('containerId', containerId);
    if (since > 0) {
      params = params.set('since', since);
    }
    return this.httpClient.get(
      `${environment.baseUrl}/simulator/simulation-logs/`,
      {
        responseType: 'text',
        observe: 'response',
        params
      }
    );
  }

  public getSynthesisLog(containerId: string, since: number): Observable<string> {
    let params: HttpParams = new HttpParams();
    params = params.set('containerId', containerId);
    if (since > 0) {
      params = params.set('since', since);
    }
    return this.httpClient.get(
      `${environment.baseUrl}/simulator/synthesis-logs/`,
      {
        responseType: 'text',
        params
      }
    );
  }
}
