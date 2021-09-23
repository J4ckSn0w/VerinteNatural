import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-product-list',
  templateUrl: './shopping-cart-product-list.component.html',
  styleUrls: ['./shopping-cart-product-list.component.css']
})
export class ShoppingCartProductListComponent implements OnInit {

  products: any[] = [
    { name: 'Producto 1', quantity: 1, unit_price: 66.2, total: 66.2, unit: 'kg', img: 'https://www.randomlists.com/img/fruits/apple.webp' },
    { name: 'Producto 2', quantity: 3, unit_price: 20.2, total: 60.6, unit: 'kg', img: 'https://www.randomlists.com/img/fruits/pear.webp' },
    { name: 'Producto 3', quantity: 2, unit_price: 70, total: 140, unit: 'kg', img: 'https://www.randomlists.com/img/fruits/tomato.webp' },
    { name: 'Producto 4', quantity: 1, unit_price: 12, total: 12, unit: 'pz', img: 'https://www.randomlists.com/img/fruits/pineapple.webp' },
    { name: 'Producto 5', quantity: 1.5, unit_price: 15, total: 22.5, unit: 'kg', img: 'https://www.randomlists.com/img/fruits/coconut.webp' },
    { name: 'Producto 6', quantity: 2, unit_price: 56, total: 112, unit: 'pz', img: 'https://www.randomlists.com/img/fruits/grape.webp' },
    { name: 'Producto 7', quantity: 3, unit_price: 33, total: 99, unit: 'pz', img: 'https://www.randomlists.com/img/fruits/tangerine.webp' },
    { name: 'Producto 8', quantity: 2.7, unit_price: 10, total: 27, unit: 'kg', img: 'https://www.randomlists.com/img/fruits/peach.webp' },
    { name: 'Producto 9', quantity: 3, unit_price: 45, total: 135, unit: 'kg', img: 'https://www.randomlists.com/img/fruits/kiwi.webp' },
    { name: 'Producto 10', quantity: 2, unit_price: 23, total: 46, unit: 'kg', img: 'https://www.randomlists.com/img/fruits/mango.webp' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
