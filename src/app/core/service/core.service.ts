import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Page} from '../model/page';
import {CorePublic} from '../model/core-public';
import {UUID} from 'antlr4ts/misc/UUID';
import {CoreCategory} from '../model/core-category';
import {CoreVersionPublic} from '../model/core-version-public';
import {Core} from "../model/core";
import {CoreVersion} from "../model/core-version";
import {PriceRange} from "../model/price-range";
import {CoreDetailPublic} from "../model/core-detail-public";
import {CoreOwnership} from "../model/core-ownership";
import {CoreVersionOwned} from "../model/core-version-owned";
import {CoreUsage} from "../model/core-usage";

/**
 * Service for working with cores.
 */
@Injectable({providedIn: 'root'})
export class CoreService {

  constructor(private http: HttpClient) {

  }

  public getCores(page?: number, size?: number, params?: {
    s?: string,
    categories?: string[],
    author?: string,
    price_range?: {
      min?: number,
      max?: number
    }
  }): Observable<Page<CorePublic>> {
    let url_params: string = `?page=${page || 0}&size=${size || 10}`;
    if (params) {
      if ('categories' in params && params.categories.length > 0) {
        for (const category of Object.values(params.categories)) {
          url_params += `&category=${category}`;
        }
      }
      if ('s' in params && params.s.length > 0) {
        url_params += '&s=' + params.s;
      }
      if ('author' in params && params.author.length > 0) {
        url_params += '&author=' + params.author;
      }
      if ('price_range' in params && params.price_range) {
        if (params.price_range.min) {
          url_params += '&min-price=' + params.price_range.min;
        }
        if (params.price_range.min) {
          url_params += '&max-price=' + params.price_range.max;
        }
      }
    }
    return this.http.get<Page<CorePublic>>(environment.baseUrl + '/cores' + url_params);
  }

  public getCoresPriceRange(): Observable<PriceRange> {
    return this.http.get<PriceRange>(environment.baseUrl + '/cores/price-range');
  }

  public getCore(core_uuid: UUID): Observable<CoreDetailPublic> {
    return this.http.get<CoreDetailPublic>(environment.baseUrl + `/cores/${core_uuid}`);
  }

  public getCategories(): Observable<CoreCategory[]> {
    return this.http.get<CoreCategory[]>(environment.baseUrl + '/cores/categories');
  }

  public getCoreVersions(core_uuid: UUID, page?: number, size?: number)
    : Observable<Page<CoreVersionPublic>> {
    const url_params: string = `?page=${page || 0}&size=${size || 10}`;
    return this.http.get<Page<CoreVersionPublic>>(environment.baseUrl + `/cores/${core_uuid}/versions` + url_params);
  }


  public getMyCores(page?: number, size?: number): Observable<Page<Core>> {
    const url_params: string = `?page=${page || 0}&size=${size || 10}`;
    return this.http.get<Page<Core>>(environment.baseUrl + '/cores/my' + url_params);
  }

  public createCore(params: {
    name: string,
    top_module: string,
    description: string,
    short_description: string,
    repository_uuid: UUID,
    category_uuid: UUID,
    price_without_updates: number,
    price_with_updates: number,
    upgrade_price: number,
    active: boolean,
    create_as_organization: boolean,
    pdf_documentation?: File
  }): Observable<Core> {
    const form_data: FormData = new FormData();
    for (const key in params) {
      if (key !== 'pdf_documentation') {
        form_data.append(key, params[key]);
      }
    }
    if (params.pdf_documentation) {
      /*
          const fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    };
    fileReader.readAsText(this.pdfDoc);
       */
      form_data.append('pdf_documentation', params.pdf_documentation,
        params.pdf_documentation.name);
    }
    return this.http.post<Core>(environment.baseUrl + '/cores/my', form_data, {
      headers:
        {
          //'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        }
    });
  }

  public updateCore(core_uuid: UUID, params: {
    name: string,
    description: string,
    short_description: string,
    category_uuid: UUID,
    price_without_updates: number,
    price_with_updates: number,
    upgrade_price: number,
    active: boolean,
    remove_pdf_documentation: boolean,
    pdf_documentation?: File
  }): Observable<Core> {
    const form_data: FormData = new FormData();
    for (const key in params) {
      if (key !== 'pdf_documentation') {
        form_data.append(key, params[key]);
      }
    }
    if (params.pdf_documentation) {
      form_data.append('pdf_documentation', params.pdf_documentation,
        params.pdf_documentation.name);
    }
    return this.http.patch<Core>(environment.baseUrl + '/cores/my/' + core_uuid, form_data, {
      headers:
        {
          Accept: 'application/json'
        }
    });
  }

  public getMyCore(core_uuid: UUID): Observable<Core> {
    return this.http.get<Core>(environment.baseUrl + `/cores/my/${core_uuid}`);
  }

  public getMyCoreVersions(core_uuid: UUID, page?: number, size?: number)
    : Observable<Page<CoreVersion>> {
    const url_params: string = `?page=${page || 0}&size=${size || 10}`;
    return this.http.get<Page<CoreVersion>>(
      environment.baseUrl + `/cores/my/${core_uuid}/versions` + url_params);
  }

  public createCoreVersion(core_uuid: UUID, params: {
    major: number,
    minor: number,
    patch: number,
    change_log: string,
    active: boolean,
  }): Observable<CoreVersion> {
    return this.http.post<CoreVersion>(environment.baseUrl + `/cores/my/${core_uuid}/versions`,
      params);
  }

  public updateCoreVersion(core_uuid: UUID, core_version_uuid: UUID, params: {
    major: number,
    minor: number,
    patch: number,
    change_log: string,
    active: boolean,
  }): Observable<CoreVersion> {
    return this.http.patch<CoreVersion>(environment.baseUrl +
      `/cores/my/${core_uuid}/versions/${core_version_uuid}`, params);
  }

  public deleteCoreVersion(core_uuid: UUID, core_version_uuid: UUID): Observable<void> {
    return this.http.delete<void>(environment.baseUrl +
      `/cores/my/${core_uuid}/versions/${core_version_uuid}`);
  }

  public getPurchasedCores(page?: number, size?: number): Observable<Page<CoreOwnership>> {
    const url_params: string = `?page=${page || 0}&size=${size || 10}`;
    return this.http.get<Page<CoreOwnership>>(environment.baseUrl + '/cores/owned' + url_params);
  }

  public getPurchasedCore(uuid: UUID): Observable<CoreOwnership> {
    return this.http.get<CoreOwnership>(environment.baseUrl + '/cores/owned/' + uuid);
  }

  public getPurchasedCoreVersions(core_uuid: UUID, page?: number, size?: number)
    : Observable<Page<CoreVersionOwned>> {
    const url_params: string = `?page=${page || 0}&size=${size || 10}`;
    return this.http.get<Page<CoreVersionOwned>>(
      environment.baseUrl + `/cores/owned/${core_uuid}/versions` + url_params);
  }


  public updatePurchasedCore(core_uuid: UUID, params: {
    repository_uuid: UUID,
    active_core_version_uuid: UUID
  }): Observable<CoreOwnership> {
    return this.http.patch<CoreOwnership>(environment.baseUrl +
      `/cores/owned/${core_uuid}`, params);
  }

  public getMyCoreUsages(core_uuid: UUID, page?: number, size?: number)
    : Observable<Page<CoreUsage>> {
    const url_params: string = `?page=${page || 0}&size=${size || 10}`;
    return this.http.get<Page<CoreUsage>>(
      environment.baseUrl + `/cores/my/${core_uuid}/usages` + url_params);
  }
}
