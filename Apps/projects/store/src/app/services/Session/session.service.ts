import { EventEmitter, Injectable, resolveForwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from 'services/Tools/HttpRequest/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpRequestService
  ) { }

  // API to login
  login(body: any) {
    let data = {
      grant_type: "password",
      scope: "*",
      username: body.username,
      password: body.password
    };
    return this.http.guess('POST', '/api/login', body).toPromise()
  }

  // API to register new account
  register(body: any) {
    return this.http.guess('POST', '/api/register', body).toPromise()
  }

  // API to recover password from email
  recoverPassword(body: any) {
    return this.http.guess('POST', '/api/forgot-password', body).toPromise()
  }

  // Save Session Token on LocaStorage
  saveSessionToken(tkn: string): void {
    localStorage.setItem('_tkn', tkn);
  }

  // Get Session Token from LocalStorage
  getSessionToken() {
    return localStorage.getItem('_tkn');
  }

  // Remove Session Token from LocalStorage
  removeSessionToken() {
    return localStorage.removeItem('_tkn');
  }

  // Ckeck if user logged
  checkAuthUser() {
    this.http.auth('GET', '/api/info').toPromise()
      .then(res => {
        this.isLogged.emit(res)
      }).catch(err => {
        this.isLogged.emit(false)
      })
  }

  // Logout 
  logout() {
    return this.http.auth('POST', '/api/logout').toPromise()
      .then(res => {
        this.isLogged.emit(false)
        this.removeSessionToken()
      }).catch(err => {
        console.log(err)
      })
  }

}
