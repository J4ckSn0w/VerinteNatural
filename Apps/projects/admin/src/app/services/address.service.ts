import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AddressService{
    constructor(
        private sessionService: SessionService,
        private http: HttpClient,
    ){}

    str_ip = environment.ip;
    str_image = environment.image;

    fnGetAllAddress():Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve, reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
            this.http.get(this.str_ip + '/api/addresses', { headers:headers }).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnPostNewAddress(data):Promise<any>{
        console.log('Entre a fnPostNewAddress');
        console.log(data);
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+ userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
            this.http.post(this.str_ip + '/api/addresses',data, {headers: headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            });
        });
        return respuesta;
    }
    fnGetAddressById(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise<any>((resolve,reject) => {
            let header = new HttpHeaders({
                Authorization: 'Bearer '+ userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.get(this.str_ip + '/api/addresses/' + id,{headers:header}).toPromise()
            .then((res) => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnEditAddress(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise<any>((resolve,reject) => {
            let header = new HttpHeaders({
                Authorization: 'Bearer '+ userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.put(this.str_ip + '/api/addresses/' + data.id,data, {headers:header}).toPromise()
            .then(res =>{
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            });
        });
        return respuesta;
    }

    fnDeleteAddress(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise<any>((resolve,reject) => {
            let header = new HttpHeaders({
                Authorization: 'Bearer '+ userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.delete(this.str_ip + '/api/addresses/' + id,{headers:header}).toPromise()
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