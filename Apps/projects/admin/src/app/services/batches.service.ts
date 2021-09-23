import { Injectable } from "@angular/core";
import { SessionService } from './sessionService.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn:'root'
})

export class BatchesService {

    str_ip = environment.ip;
    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization: 'Bearer '+this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
    });

    constructor(
        private sessionService: SessionService,
        private http: HttpClient
    ){}

    fnPostNewBatch(data):Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.post(this.str_ip+'/api/_p1/batches',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnPuteditbatch(data):Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.put(this.str_ip+'/api/_p1/batches/'+data.id,data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnDeleteBatch(id):Promise<any>{
        let respuesta = new Promise((resolve,reject)=> {
            this.http.delete(this.str_ip+'/api/_p1/batches/'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetBatches():Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/batches',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetBatchById(id):Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/batches/'+id,{headers:this.headers}).toPromise()
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