import { Injectable } from "@angular/core";
import { SessionService } from './sessionService.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn:'root'
})

export class ProductCategoriesService {

    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization:'Bearer '+this.userToken,
        Accept:'application/json',
        ContentType:'application/json'
    })

    str_ip = environment.ip;

    constructor(
        private sessionService:SessionService,
        private http : HttpClient
    ){}

    fnGetProductCategories():Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/categories',{headers:this.headers}).toPromise()
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