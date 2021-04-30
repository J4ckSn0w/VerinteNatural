import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-product',
  templateUrl: './shopping-cart-product.component.html',
  styleUrls: ['./shopping-cart-product.component.css']
})

export class ShoppingCartProductComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    if (!isNaN(Number(this.product.quantity)))
      this.product.quantity = Number((this.product.quantity + 1).toFixed(2));
    else
      this.product.quantity = 1;

    this.setTotal();
  }

  sub() {
    if (this.product.quantity > 1)
      this.product.quantity = Number((this.product.quantity - 1).toFixed(2));

    this.setTotal();
  }

  setTotal() {
    this.product.total = Number((this.product.quantity * this.product.unit_price).toFixed(2));
  }

  onChangeQuantity(event: any) {
    this.setTotal();
  }

}
