import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'services/Product/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.product)
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes);
  }




}
