import { Injectable } from "@angular/core";
import { environment } from '../../../../admin/src/environments/environment';
import { SessionService } from './sessionService.service';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class IncidentService {
    str_ip = environment.ip;
    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization: 'Bearer '+this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
    });
    constructor(
        private sessionService:SessionService,
        private http : HttpClient
    ){
        
    }

    fnPostNewIncident(data):Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.post(this.str_ip + '/api/_p1/incidents', data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnPutEditIncident(data):Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.put(this.str_ip+'/api/_p1/incidents'+data.id,data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetIncidents():Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/incidents',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetIncidentById(id):Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/incidents'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej)
            })
        });
        return respuesta;
    }

    fnDeleteIncident(id):Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.delete(this.str_ip + '/api/_p1/incidents/' + id,{headers:this.headers}).toPromise()
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