import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DriverService{

    str_ip = environment.ip;

    constructor(
        private sessionService: SessionService,
        private http: HttpClient
    ){}


    fnGetDrivers():Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.get(this.str_ip + '/api/driver/types',{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            });
        });
        return respuesta;
    }

    fnPostDriver():Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {

        });
        return respuesta;
    }

    fnChangeVehicle(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {

        });

        return respuesta;
    }
}