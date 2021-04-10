import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  arrayWarehouses = [];

  constructor() { }

  ngOnInit(): void {
  }

  fnVer(){}
  fnEdit(){}
  fnDelete(){}
  fnLoadWarehouses(){}

}
