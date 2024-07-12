import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CoreOwnership} from '../../api/models/core-ownership';
import {Observable} from 'rxjs';

/**
 * Service for working with repositories.
 */
@Injectable({providedIn: 'root'})
export class CoresService {

  constructor(private http: HttpClient) {
  }

  public getRepositoryAttachedOwnedCores(repoUuid: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.baseUrl}/repos/${repoUuid}/attached-cores`);
  }

  public getOwnedCoreVersions(coreOwnershipUuid: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/cores/owned/${coreOwnershipUuid}/versions?page=0&size=1000`);
  }

  // tslint:disable-next-line:max-line-length
  public setOwnedCoreVersion(coreOwnershipUuid: string, coreVersionUuid: string): Observable<CoreOwnership> {
    return this.http.patch<CoreOwnership>(`${environment.baseUrl}/cores/owned/${coreOwnershipUuid}/version/${coreVersionUuid}`, {});
  }

  public enableOwnedCore(coreOwnershipUuid: string): Observable<CoreOwnership> {
    return this.http.patch<CoreOwnership>(`${environment.baseUrl}/cores/owned/${coreOwnershipUuid}/enable`, {});
  }

  public disableOwnedCore(coreOwnershipUuid: string): Observable<CoreOwnership> {
    return this.http.patch<CoreOwnership>(`${environment.baseUrl}/cores/owned/${coreOwnershipUuid}/disable`, {});
  }
}
