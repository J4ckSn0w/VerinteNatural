import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { SessionService } from '../services/sessionService.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class VehicleService {

    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization: 'Bearer '+this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
      });

    str_ip = environment.ip;
    str_image = environment.image;

    constructor(
        private sessionService: SessionService,
        private http: HttpClient        
    ) { }

    fnPostNewVehicle(data):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.post(this.str_ip + '/api/_p1/vehicles',data,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnPostUpdateVehicle(data,id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.put(this.str_ip + '/api/_p1/vehicles/'+id,data,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnGetVehicleById(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.get(this.str_ip + '/api/_p1/vehicles/'+id,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnGetVehicles():Promise<any> {
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.get(this.str_ip+'/api/_p1/vehicles',{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    fnDeleteVehicle(id):Promise<any>{
        let userToken = this.sessionService.fnGetSessionToken();
        let respuesta = new Promise((resolve,reject) => {
            let headers = new HttpHeaders({
                Authorization: 'Bearer '+userToken,
                Accept: 'application/json',
                ContentType: 'application/json'
              });
              this.http.delete(this.str_ip + '/api/_p1/vehicles/'+id,{headers:headers}).toPromise()
              .then(res => {
                  resolve(res);
              })
              .catch(rej => {
                  reject(rej);
              })
        });
        return respuesta;
    }

    /*Entradas de kilometraje*/
    fnPostKilometer(data):Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.post(this.str_ip + '/api/_p1/mileage/records',data,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }

    fnGetKilometer(id,firstDate,lastDate):Promise<any>{
        return new Promise((resolve,reject) => {
            //this.http.get(this.str_ip + '/api/_p1/vehicles/report/'+id+'/'+firstDate+'/'+lastDate,{headers:this.headers}).toPromise()
            //this.http.get(this.str_ip + '/api/_p1/vehicles/report',{headers:this.headers}).toPromise()
            this.http.get(this.str_ip + '/api/_p1/mileage/records/' + id +'?from='+firstDate+'&to='+lastDate,{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        })
    }
}