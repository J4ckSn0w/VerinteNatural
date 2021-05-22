import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './sessionService.service';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn:'root'
})

export class StorageService {
    str_ip = environment.ip;
    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization: 'Bearer '+ this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
    })

    constructor(
        private http : HttpClient,
        private sessionService: SessionService
    ){}

    fnPostStorageOrder(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.post(this.str_ip + '/api/_p1/storage/orders',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
    }

    fnGetStorageOrders():Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/storage/orders',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
    }

    fnGetStorageOrderById(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/storage/orders/'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

}