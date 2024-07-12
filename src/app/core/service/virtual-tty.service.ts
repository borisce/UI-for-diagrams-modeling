import { Injectable } from '@angular/core';
import { protocol } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { VirtualTTYapiService } from './virtual-ttyapi.service';
import { Observable } from "rxjs";
import { ApiTTYResponse } from "../model/api-ttyresponse";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VirtualTTYService {

  public TTY_id: string;

  constructor(private apiService: VirtualTTYapiService) {
  }

  public async startTTY(projectId: string, userId: string): Promise<string> {
    if (this.TTY_id === undefined) {
      const s: ApiTTYResponse = await this.apiService.createTTYSession(projectId, userId);
      this.TTY_id = s?.id;
      await this.apiService.startTTYSession(this.TTY_id);
    }
    return this.TTY_id;
  }

  public async startSynthesisTTY(projectId: string, userId: string, endStep: string, technology: string): Promise<string> {
    const s: ApiTTYResponse = await this.apiService.createTTYSynthetizationSession(projectId, userId, endStep, technology);
    this.TTY_id = s?.id;
    await this.apiService.startTTYSynthetizationSession(this.TTY_id);
    return this.TTY_id;
  }

  public async killTTY(): Promise<void> {
    await this.apiService.killTTYSession(this.TTY_id);
    this.TTY_id = undefined;
  }

  public async deleteTTY(): Promise<void> {
    await this.apiService.deleteTTYSession(this.TTY_id);
    this.TTY_id = undefined;
  }


  public attachTTY(selectedEnvironment: string): void {
    this.TTY_id = selectedEnvironment;
  }

  public startSimulation(test_number = null): Observable<object> {
    return this.apiService.startSimulation(this.TTY_id,test_number);
  }

  public startSynthesis(endStep: String): Observable<object> {
    return this.apiService.startSynthesis(this.TTY_id, endStep);
  }

  public getLog(since: number): Observable<HttpResponse<string>> {
    return this.apiService.getLog(this.TTY_id, since);
  }

  public getSynthesisLog(since: number): Observable<string> {
    return this.apiService.getSynthesisLog(this.TTY_id, since);
  }
}
