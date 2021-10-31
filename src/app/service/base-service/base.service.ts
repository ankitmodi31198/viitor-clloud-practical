import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQueryParams } from './base-service-utils';
import { BASE_URL } from './base-url';

@Injectable()
export abstract class BaseService {
  baseUrl: string;

  abstract urlPath: string;

  constructor(protected httpClient: HttpClient, protected injector: Injector) {
    this.baseUrl = environment.baseUrl;
  }

  get(queryParams?: IQueryParams, subpath?: string): Observable<any> {
    subpath = subpath || '';
    const url = this.getUrl() + subpath;
    const options = this.getHttpOptions();
    return this.httpClient.get<any>(url, options);
  }

  post(
    postModel: any,
    queryParams?: IQueryParams,
    subpath?: string
  ): Observable<any> {
    subpath = subpath || '';
    const url = this.getUrl() + subpath;
    const options = this.getHttpOptions();
    return this.httpClient.post(url, postModel, options);
  }

  put(
    postModel: any,
    queryParams?: IQueryParams,
    subpath?: string
  ): Observable<any> {
    subpath = subpath || '';
    const url = this.getUrl() + subpath;
    const options = this.getHttpOptions();
    return this.httpClient.put(url, postModel, options);
  }

  getUrl(): string {
    let baseUrl: string;
    if (this.baseUrl) {
      baseUrl = this.baseUrl;
    } else {
      baseUrl = this.injector.get(BASE_URL);
    }
    return baseUrl + this.urlPath;
  }

  delete(model: any, queryParams?: IQueryParams, subpath?: string): Observable<any> {
    subpath = subpath || '';
    const url = this.getUrl() + subpath;
    const options = this.getHttpOptions();
    return this.httpClient.request('DELETE', url, { body: model, responseType: 'json', params: queryParams});
  }

  getHttpOptions(): any {
    return {
      headers: this.getDefaultHeaders(),
    };
  }

  getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders();
  }
}
