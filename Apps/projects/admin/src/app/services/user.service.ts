import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../services/sessionService.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    str_ip: string = environment.ip;
    str_images: string = environment.image;


    constructor(private http: HttpClient,
      private sessionService:SessionService) { }

    fnPostNewUser(obj) : Promise<any> {
        let respuesta = new Promise((resolve, reject) => {
            let headers = new HttpHeaders;
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
            this.http.post(this.str_ip + '/api/_p1/register', obj).toPromise()
              .then((res: any) => {
                resolve(res)
              })
              .catch(rej => {
                reject(rej)
              });
          });
          return respuesta;
    }

    fnPostNewUserA(obj) : Promise<any> {
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve, reject) => {
          let headers = new HttpHeaders({
            Authorization: 'Bearer '+userToken,
            Accept: 'application/json',
            ContentType: 'application/json'
          });
          this.http.post(this.str_ip + '/api/_p1/employees', obj,{headers:headers}).toPromise()
            .then((res: any) => {
              resolve(res)
            })
            .catch(rej => {
              reject(rej)
            });
        });
        return respuesta;
    }

    fnGetUsers() : Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve,reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.get(this.str_ip + '/api/_p1/employees', {headers:headers}).toPromise()
          .then((res: any) => {
              //console.log(res);
              //console.log('Respuesta de user types:'+ res.data);
            resolve(res)
          })
          .catch(rej => {
              console.log('Algo salio mal con users.');
            reject(rej)
          });
      });
      return respuesta;
    }

    fnGetUserById(id):Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.get(this.str_ip + '/api/_p1/employees/' + id, {headers:headers}).toPromise()
        .then(res => {
          //console.log(res);
          resolve(res);
        })
        .catch(rej =>{
          //console.log(rej);
          reject(rej);
        })
      });
      return respuesta;
    }

    fnUpdateUser(obj):Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve,reject) =>{
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.put(this.str_ip + '/api/_p1/employees/' + obj.id,obj,{headers:headers}).toPromise()
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(rej => {
          console.log(rej);
          reject(rej);
        })
      });
      return respuesta;
    }

    fnDeleteUser(id):Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();

      let respuesta = new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.delete(this.str_ip + '/api/_p1/employees/' + id, {headers: headers}).toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
      });
      return respuesta;
    }

    fnGetUserByToken():Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.get(this.str_ip + '/api/_p1/info', {headers: headers}).toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((rej) => {
          reject(rej);
        });
      });
      return respuesta;
    }
}