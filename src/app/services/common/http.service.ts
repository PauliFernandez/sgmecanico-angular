import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObjectUnsubscribedError } from 'rxjs/index';
import * as _ from 'lodash';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json;',
  'Authorization': 'my-auth-token',
  'Access-Control-Allow-Origin': '*'
});

const httpHeadersList = new HttpHeaders({
  'Content-Type': 'application/json;',
  'Authorization': 'my-auth-token',
  'Access-Control-Allow-Origin': '*'
});

const httpHeadersFile = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': 'my-auth-token',
  'Access-Control-Allow-Origin': '*'
});


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiURL: string = 'https://localhost:7232/api/';

  constructor(private http: HttpClient) { }


  private completeURL(url: string) {
    return this.apiURL + url;
  }

  public get(url: string, params?: any): Observable<any> {
    return this.http
      .get(this.completeURL(url), { params: params},);
  }

  public post(url: string, object: any): Observable<any> {
    // const body = _.pickBy(object, _.identity);
    const body = object;
    return this.http.post(this.completeURL(url), body, { headers: httpHeaders });
  }

  public put(url: string, object: any): Observable<any> {
    const body = _.pickBy(object, _.identity);
    return this.http.put(this.completeURL(url), body, { headers: httpHeaders });
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(this.completeURL(url), { headers: httpHeaders });
  }

}
