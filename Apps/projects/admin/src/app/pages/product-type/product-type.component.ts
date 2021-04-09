import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  arrayProductTypes = [];

  constructor() { }

  ngOnInit(): void {
  }

  fnEdit(){}
  fnDelete(){}
  fnVer(){}
  fnLoadProductTypes(){}

}
