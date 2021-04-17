import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from '../services/sessionService.service';
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
            this.http.get(this.str_ip + '/api/_p1/driver/types',{headers:headers}).toPromise()
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

    fnGetDriverById(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.get(this.str_ip + '/api/_p1/drivers/'+id,{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnEditDriver(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.put(this.str_ip+'/api/_p1/drivers/' + data.id,data,{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej)
            });
        });
        return respuesta;
    }
}