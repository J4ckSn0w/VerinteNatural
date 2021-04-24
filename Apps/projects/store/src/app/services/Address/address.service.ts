import { EventEmitter, Injectable } from '@angular/core';
import { HttpRequestService } from 'services/Tools/HttpRequest/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public hasNewAddress: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpRequestService) { }

  // Store new address
  store(body: any) {
    return this.http.auth('POST', '/api/_p2/addresses', body).toPromise()
  }

  // Update new address
  update(id: number, body: any) {
    return this.http.auth('PUT', `/api/_p2/addresses/${id}`, body).toPromise()
  }

  // Get all Municipalities
  municipalities(state_id: number) {
    return this.http.guess('GET', `/api/_p2/municipalities/${state_id}`).toPromise()
  }

  // Get all States
  states() {
    return this.http.guess('GET', '/api/_p2/states').toPromise()
  }

  // Get All address
  addresses() {
    return this.http.auth('GET', '/api/_p2/addresses').toPromise()
  }

  // Get a only address
  address(id: number) {
    return this.http.auth('GET', `/api/_p2/addresses/${id}`).toPromise()
  }

  delete(id: number) {
    return this.http.auth('DELETE', `/api/_p2/addresses/${id}`).toPromise()
  }

}
