import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})



export class UserService {

    str_ip: string = environment.ip;
    str_images: string = environment.image;


    constructor(private http: HttpClient) { }

    fnPostNewUser(obj) : Promise<any> {
        let respuesta = new Promise((resolve, reject) => {
            let headers = new HttpHeaders;
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
            this.http.post(this.str_ip + '/api/user', obj).toPromise()
              .then((res: any) => {
                resolve(res)
              })
              .catch(rej => {
                reject(rej)
              });
          });
          return respuesta;
    }
}