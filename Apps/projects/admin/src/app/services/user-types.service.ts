import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { rejects } from "assert";
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class UserTypesService{

    str_ip: string = environment.ip;
      str_images: string = environment.image;

    constructor(
        private http: HttpClient,
        private sessionService:SessionService
    ){

    }

    fnGetUserTypes(obj):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        //console.log('userToken: ' + userToken);
        let respuesta =  new Promise((resolve, reject) => {
            let headers = new HttpHeaders({
              Authorization: 'Bearer '+userToken,
              Accept: 'application/json',
              ContentType: 'application/json'
            });
            this.http.get(this.str_ip + '/api/user/types', {headers:headers}).toPromise()
              .then((res: any) => {
                  //console.log(res);
                  //console.log('Respuesta de user types:'+ res.data);
                resolve(res)
              })
              .catch(rej => {
                  console.log('Algo salio mal con user types.');
                reject(rej)
              });
        });
        return respuesta;
    }

    fnGetEmployeesTypes():Promise<any>{
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise((resolve,reject) => {
        let headers = new HttpHeaders({
          Authorization: 'Bearer '+userToken,
              Accept: 'application/json',
              ContentType: 'application/json'
        });
        this.http.get(this.str_ip + '/api/employee/types',{headers:headers}).toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(rej => {
          reject(rej);
        })
      });

      return respuesta;
    }
}