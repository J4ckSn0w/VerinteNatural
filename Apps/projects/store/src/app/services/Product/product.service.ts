import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequestService } from 'services/Tools/HttpRequest/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpRequestService) { }

  getHomeProducts() {
    this.http.guess('GET', '/api/_p2/products').toPromise()
      .then((res: any) => {
        this.products.emit(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

}
