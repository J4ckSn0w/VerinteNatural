import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { LOGIN_STATE_ENUM } from '../emun/login-state.enum';
import { ApiHelper } from '../helper/api.helper';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    str_ip: string = environment.ip;
    str_images: string = environment.image;

    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ){
      //console.log("Entre al constructor de Login Service");
    }
    
    fnPostNewUser(obj:any):Promise<any>{
        return new Promise(null);
    }

    fnPostLogin(obj:any){
      this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.CHECKING);
      console.log(obj);
        let response = new Promise((resolve, reject) => {
            let headers = new HttpHeaders;
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
            this.http.post(this.str_ip + '/api/login' , obj).toPromise()
              .then((res: any) => {
                //console.log("THEN de el servicio");
                if(res.error)
                {
                  reject();
                }
                console.log(res);
                this.sessionService.fnSaveSession(res);
                resolve(res)
              })
              .catch(rej => {
                console.log(rej);
                this.sessionService.fnLogOut();
                this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.NO_LOGGED);
                reject(rej)
              });
          });
        return response;
    }

    fnTokenLoginUser(array_params:Array<any>, str_api:string):Promise<any>{
      console.log('Entre a tokenLoginUser');
      let userToken = this.sessionService.fnGetSessionToken();
      let respuesta = new Promise<any>((resolve, reject) => {
        let header = new HttpHeaders({
          Authorization: 'Bearer '+userToken,
          Accept: 'application/json',
          ContentType: 'application/json'
        });
        this.http.get(this.str_ip + str_api,{headers: header}).toPromise()
          .then((res:any)=>{
            console.log('Entre a then');
            this.sessionService.fnSaveSession(res,false);
            resolve();
          })
          .catch(rej => {
            console.log('Entre a catch');
            this.sessionService.fnLogOut();
            this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.VALIDATION_ERROR);
            reject();
          });
      });
      return respuesta;
    }
}