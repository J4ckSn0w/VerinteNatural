import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './sessionService.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn:'root'
})

export class RequisitionService{

    str_ip = environment.ip;

    userToken = this.sessionService.fnGetSessionToken();

    headers = new HttpHeaders({
        Authorization: 'Bearer '+this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
    })

    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ){}

    fnPostNewRequisition(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.post(this.str_ip + '/api/_p1/requisitions',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetAllRequisition():Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/requisitions',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetRequisitionById(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/requisitions/' + id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnUpdateRequisition(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.put(this.str_ip + '/api/_p1/requisitions/'+data.id,data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnDeleteRequisition(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.delete(this.str_ip + '/api/_p1/requisitions/'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }
}