import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VcdParserService {

  constructor(private httpClient: HttpClient) {
  }

  public async convertVCD(vcd: string): Promise<string> {
    const httpOptions = {
      params: new HttpParams()
    }
    const url = environment.baseUrl + '/vcd-parser/convert';
    const req = await this.httpClient.post<string>(url, vcd, httpOptions).toPromise();
    return req;
  }
}
