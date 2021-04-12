import { Injectable } from '@angular/core';
import { HttpRequestService } from 'services/Tools/HttpRequest/http-request.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpRequestService) { }

  profileData() {
    return this.http.auth('GET', '/api/_p2/_user')
  }

}
