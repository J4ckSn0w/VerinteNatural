import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';
import { SessionService } from './sessionService.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn:'root'
})

export class IncidentTypeService{

    str_ip = environment.ip;

    userToken = this.sessionService.fnGetSessionToken();

    headers = new HttpHeaders({
        Authorization: 'Bearer '+this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
    })

    constructor(
        private sessionService: SessionService,
        private http: HttpClient
    ){}

    fnPostNewIncidentType(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.post(this.str_ip + '/api/_p1/incident/types',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnPuteditIncidentType(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.put(this.str_ip+'/api/_p1/incident/types/'+data.id,data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fngetIncidentsTypes():Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/incident/types',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetIndicidenttypeById(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/incident/types/'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnDeleteIndicentType(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.delete(this.str_ip + '/api/_p1/incident/types/'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }
}