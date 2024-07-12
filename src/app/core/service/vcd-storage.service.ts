import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VcdStorageService {

  constructor(private httpClient: HttpClient) { }

  public async getWaveform(filename: string, projectId: string): Promise<string> {
    const url = environment.baseUrl + `/vcd-storage/vcd-storage?fileName=${filename}&projectId=${projectId}`;
    return this.httpClient.get(
      url,
      { responseType: 'text' }
    ).toPromise();
  }

  public async pushWaveform(filename: string, projectId: string, content: string): Promise<string> {
    const url = environment.baseUrl + `/vcd-storage/vcd-storage?fileName=${filename}&projectId=${projectId}`;
    return this.httpClient.put(
      url,
      content,
      { responseType: 'text' }
    ).toPromise();
  }

  public async updateWaveform(filename: string, projectId: string, content: string): Promise<string> {
    const url = environment.baseUrl + `/vcd-storage/vcd-storage?fileName=${filename}&projectId=${projectId}`;
    return this.httpClient.patch(
      url,
      content,
      { responseType: 'text' }
    ).toPromise();
  }

  public async deleteWaveform(filename: string, projectId: string): Promise<string> {
    const url = environment.baseUrl + `/vcd-storage/vcd-storage?fileName=${filename}&projectId=${projectId}`;
    return this.httpClient.delete(
      url,
      { responseType: 'text' }
    ).toPromise();
  }
}
