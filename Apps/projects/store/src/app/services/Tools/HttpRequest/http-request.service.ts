import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(
    private httpAuth: HttpClient,
    private httpGuess: HttpClient
  ) { }

  auth(_method: string, _url: string, body?: any) {
    let _tkn = localStorage.getItem('_tkn');
    let headers = new HttpHeaders({
      ContentType: 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer  ${_tkn}`
    })

    return this.httpAuth.request(_method, _url, { body: body ?? null, headers: headers })
  }

  guess(_method: string, _url: string, body?: any) {
    let headers = new HttpHeaders({
      ContentType: 'application/json',
      Accept: 'application/json',
    })

    return this.httpGuess.request(_method, _url, { body: body ?? null, headers: headers });
  }

}
