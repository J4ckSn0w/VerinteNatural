import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiHelper } from '../helper/api.helper';
import { rejects } from 'assert';

@Injectable({
    providedIn: 'root'
})
export class ApiCallService {
    str_ip: string = environment.ip;
    str_images: string = environment.image;

    constructor( private http: HttpClient ) { }

    fnGetHttpClient(): HttpClient{
        return this.http;
    }

    fnPostPromise(any_body: any, str_api: string): Promise<any>{
        return new Promise((resolve, reject) => {
            this.http.post(this.str_ip + str_api, any_body).toPromise()
            .then((res: any) =>{
                resolve(res)
            })
            .catch(rej => {
                reject(rej)
            });
        });
    }

    fnPostWithParamsPromise(any_body: any, array_params: Array<any>, str_api: string): Promise<any>{
        return new Promise((resolve, reject) => {
            let apiHelper: ApiHelper = new ApiHelper();
            let any_validCall = apiHelper.fnSetParams(array_params, str_api);
            if(any_validCall._success){
                this.http.post(this.str_ip + any_validCall._message, any_body).toPromise()
                .then((res:any) => {
                    resolve(res)
                })
                .catch(rej => {
                    reject(rej)
                });
            } else {
                reject()
            }
        });
    }

    fnGetPrommise(array_param:Array<any>, str_api: string):Promise<any>{
        return new Promise((resolve, reject) => {
            let apiHelper: ApiHelper = new ApiHelper();
            let any_validCall = apiHelper.fnSetParams(array_param, str_api);
            if(any_validCall._success) {
                this.http.get(this.str_ip + any_validCall._message).toPromise()
                .then((res:any) => {
                    resolve(res)
                })
                .catch(rej => {
                    reject(rej)
                });
            } else {
                reject(any_validCall._message)
            }
        });
    }

    fnGetWithParams(arrayParams:any,str_api):Promise<any>{
        return new Promise((resolve, reject) => {
            let headers = new HttpHeaders();
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
            this.http.get(str_api, { params: arrayParams }).toPromise()
            .then(res => {
                resolve(res)
            })
            .catch(rej => {
                reject(rej)
            })
        });
    }
}