import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../services/sessionService.service';

@Injectable({
    providedIn: 'root'
})

export class WarehouseService {
    str_ip = environment.ip;

    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ){ }

    fnPostNewWarehouse(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.post(this.str_ip+'/api/warehouses',data,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnPostEditWarehouse(data,id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.put(this.str_ip + '/api/warehouses/'+id,data,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              });
        });
        return respuesta;
    }

    fnGetWarehouseById(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.get(this.str_ip+'/api/warehouses/'+id,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              });
        });
        return respuesta;
    }

    fnGetWarehouses():Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.get(this.str_ip+'/api/warehouses',{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              });
        });
        return respuesta;
    }

    fnDeleteWarehouse(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject)=>{
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.delete(this.str_ip+'/api/warehouses/'+id,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              });
        });
        return respuesta;
    }

    
}