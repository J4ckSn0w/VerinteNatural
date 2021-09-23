import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from "./sessionService.service";
import { environment } from '../../environments/environment';

import { saveAs } from 'file-saver';
import { throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class ReportService{

    str_ip = environment.ip;

    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization: 'Bearer '+this.userToken,
        Accept: 'application/pdf',
        ContentType: 'application/pdf'
    });

    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ){}

    fnGetReport(id,firstDate,lastDate){
        return new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/vehicles/report/'+id+'/'+firstDate+'/'+lastDate,{headers:this.headers,responseType:'blob'}).subscribe(
                (response) => {
                    var blob = new Blob([response], { type:'application/pdf' });
                    saveAs(blob, 'report.pdf');
                },
                e => { throwError(e); }
            )
            /*.then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })*/
        })
    }
}