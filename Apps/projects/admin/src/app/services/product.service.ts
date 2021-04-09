import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    str_ip = environment.ip;

    constructor(
        private sessionService: SessionService,
        private http : HttpClient
    ){}

    fnPostNewProduct(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorizacion:'Bearer '+userToken,
                Accept:'application/json',
                ContentType:'application/json'
            });
            this.http.post(this.str_ip+'/api/product',data,{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            });
        });
        return respuesta;
    }

    fnPutEditProduct(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorizacion:'Bearer '+userToken,
                Accept:'application/json',
                ContentType:'application/json'
            });
            this.http.put(this.str_ip + '/api/product',data,{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetProductById(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization:'Bearer '+userToken,
                Accept:'application/json',
                ContentType:'application/json'
            });
            this.http.get(this.str_ip+'/api/products/'+id,{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnGetProducts():Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization:'Bearer '+userToken,
                Accept:'application/json',
                ContentType:'application/json'
            });
            this.http.get(this.str_ip+'/api/products',{headers:headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }

    fnDeleteProduct(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization:'Bearer '+userToken,
                Accept:'application/json',
                ContentType:'application/json'
            });
            this.http.delete(this.str_ip+'/api/products/'+id,{headers:headers}).toPromise()
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