import { Injectable } from '@angular/core';
import { SessionService } from './sessionService.service';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../admin/src/environments/environment';
@Injectable({
    providedIn:'root'
})

export class RolesService {

    str_ip = environment.ip;
    userToken = this.sessionService.fnGetSessionToken();
    headers = new HttpHeaders({
        Authorization: 'Bearer '+this.userToken,
        Accept: 'application/json',
        ContentType: 'application/json'
    });

    constructor(
        private sessionService:SessionService,
        private http :HttpClient
    ){}

    fnGetRoles():Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.get(this.str_ip + '/api/_p1/roles',{headers:this.headers}).toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(rej => {
                reject(rej);
            })
        });
        return respuesta;
    }
    fnGetRolesByArea(id):Promise<any>{
        let respuesta = new Promise((resolve,reject) => {
            this.http.get(this.str_ip+'/api/_p1/roles/'+id,{headers:this.headers}).toPromise()
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