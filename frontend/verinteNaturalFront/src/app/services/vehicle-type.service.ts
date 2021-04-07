import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class VehicleTypeService{
    str_ip = environment.ip;

    constructor(
        private sessionService:SessionService,
        private http: HttpClient
    ){}

    fnPostNewVehicleType(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.post(this.str_ip + '/api/vehicles/types',data,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnPostEditVehicleType(data,id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.put(this.str_ip+'/api/vehicles/types/'+id,data,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                reject(rej);
              });
        });
        return respuesta;
    }

    fnGetVehicleTypes():Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.get(this.str_ip + '/api/vehicles/types',{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }
    
    fnGetVehicleTypeById(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.get(this.str_ip + '/api/vehicles/types/' + id,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnDeleteVehicletype(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.delete(this.str_ip + '/api/vehicles/types/'+id,{headers:headers}).toPromise()
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