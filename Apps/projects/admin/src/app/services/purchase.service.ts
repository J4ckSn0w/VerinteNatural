import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from './sessionService.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class PurchaseService {

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

    fnPostNewPurchase(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.post(this.str_ip + '/api/_p1/purchase/orders',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetPurchases():Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/purchase/orders',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetPurchaseById(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/purchase/orders/'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })

        }) 
    }

    fnPutEditPurchase(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.put(this.str_ip+'/api/_p1/purchase/orders/'+data.id,data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnDeletePurchase(id):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.delete(this.str_ip+'/api/_p1/purchase/orders/'+id,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }
}