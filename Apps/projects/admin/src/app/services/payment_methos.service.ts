import { Injectable } from "@angular/core";
import { SessionService } from './sessionService.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn:'root'
})

export class PaymentMethodService {

    str_ip = environment.ip;
    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization:'Bearer '+this.userToken,
        Accept:'application/json',
        ContentType:'application/json'
    })

    constructor(
        private sessionService: SessionService,
        private http : HttpClient
    ){}

    fnGetPaymentMethods():Promise<any>{
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/payment/forms',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
    }
}