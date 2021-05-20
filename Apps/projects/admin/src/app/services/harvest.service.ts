import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from './sessionService.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class HarvestService {

    str_ip = environment.ip;

    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization: 'Bearer '+this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
    });

    constructor(
        private sessionService:SessionService,
        private http: HttpClient
    ){}

    fnPostNewHarvest(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.post(this.str_ip + '/api/_p1/harvests',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetHarvests():Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/harvests',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
    }

    fnGetHarvestById(harvest_id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/harvests/'+harvest_id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    /*Ordenes de recoleccion*/
    fnPostNewHarvestSheet(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.post(this.str_ip+'/api/_p1/harvest/sheets',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }
}