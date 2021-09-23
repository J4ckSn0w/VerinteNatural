import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from '../services/sessionService.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ProductTypeService{

    str_ip = environment.ip;

    constructor(
        private sessionService: SessionService,
        private http : HttpClient
    ){}

    fnPostNewProductType(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.post(this.str_ip+'/api/_p1/product/types',data,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej)
              })
        });
        return respuesta;
    }

    fnGetProductTypes():Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.get(this.str_ip+'/api/_p1/product/types',{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnPutEditProductTypes(data,id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.put(this.str_ip+'/api/_p1/product/types/'+id,data,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnGetProductType(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.get(this.str_ip+'/api/_p1/product/types/'+id,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnDeleteProductType(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.delete(this.str_ip + '/api/_p1/product/types/'+id,{headers: headers}).toPromise()
              .then(res => {
                  resolve(res);
                })
                .catch(rej => {
                    reject(rej);
                })
        });
        return respuesta;
    }
}