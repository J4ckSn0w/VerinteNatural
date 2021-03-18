import { Inject, Injectable } from "@angular/core";
import { UserService } from './user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    str_ip: string = environment.ip;
    str_images: string = environment.image;

    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ) {}

    fnPostNewClient(obj) : Promise<any> {
        let respuesta = new Promise((resolve, reject) => {
            let headers = new HttpHeaders;
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
            this.http.post(this.str_ip + '/api/register', obj).toPromise()
              .then((res: any) => {
                resolve(res)
              })
              .catch(rej => {
                reject(rej)
              });
          });
          return respuesta;
    }

    fnGetAllUSers():Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.get(this.str_ip + '/api/customers',{headers: headers}).toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(rej => {
          reject(rej)
        });
      });
      return respuesta;
    }

    fnEditUser(data):Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve,reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+ userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.put(this.str_ip + '/api/customers/' + data.id, data, {headers:headers}).toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(rej => {
          reject(rej);
        })
      });
      return respuesta;
    }

    fnGetClientById(id):Promise<any>{
      console.log(id);
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve,reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+ userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.get(this.str_ip + '/api/customers/' + id, {headers: headers}).toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(rej => {
          reject(rej);
        })
      });
      return respuesta;
    }
    fnDeleteClient(id):Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve,reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer ' + userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.delete(this.str_ip + '/api/customers/' + id, {headers: headers}).toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(rej => {
          reject(rej);
        });
      });
      return respuesta;
    }
}