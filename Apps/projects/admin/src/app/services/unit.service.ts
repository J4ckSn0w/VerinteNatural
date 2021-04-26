import { Injectable } from '@angular/core';
import { SessionService } from './sessionService.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn:'root'
})

export class UnitService{

    str_ip = environment.ip;

    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization: 'Bearer '+ this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
    })

    constructor(
        private sessionService:SessionService,
        private http: HttpClient
    ){}

    fnPostNewUnit(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.post(this.str_ip + '/api/_p1/units',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetUnits():Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/units',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetUnitById(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/units/'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnDeleteUnit(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.delete(this.str_ip + '/api/_p1/units/'+id,{headers:this.headers}).toPromise()
            .then(res =>{
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnEditUnit(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.put(this.str_ip+'/api/_p1/units/'+data.id,data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

}