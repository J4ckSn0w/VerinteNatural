import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../services/sessionService.service';

@Injectable({
    providedIn:'root'
})

export class ProviderService  {
    str_ip = environment.ip;

    constructor(
        private sesionService : SessionService,
        private http : HttpClient
    ){}

    fnPostProviderNew(data):Promise<any>{
        let userToken = this.sesionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.post(this.str_ip + '/api/_p1/providers',data,{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetProviders():Promise<any>{
        let userToken = this.sesionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.get(this.str_ip + '/api/_p1/providers',{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetProvidersWithProducts():Promise<any>{
        let userToken = this.sesionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.get(this.str_ip + '/api/_p1/providers?with_products=true',{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetProviderById(id):Promise<any>{
        let userToken = this.sesionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.get(this.str_ip + '/api/_p1/providers/' + id,{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnDeleteProvider(id):Promise<any>{
        let userToken = this.sesionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.delete(this.str_ip + '/api/_p1/providers/' + id,{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnPutEditProvider(data):Promise<any>{
        let userToken = this.sesionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) =>{
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
            });
            this.http.put(this.str_ip + '/api/_p1/providers/'+data.id,data,{headers:headers}).toPromise()
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