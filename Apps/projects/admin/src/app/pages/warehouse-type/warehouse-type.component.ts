import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse-type',
  templateUrl: './warehouse-type.component.html',
  styleUrls: ['./warehouse-type.component.css']
})
export class WarehouseTypeComponent implements OnInit {

  arrayWarehouseTypes = [];

  constructor(
    //private warehouseTypeService: WarehouseTypeComponent
  ) { }

  ngOnInit(): void {
    this.fnLoadWarehouseTypes();
  }

  fnLoadWarehouseTypes(){}

  fnEdit(){}
  fnNew(){}
  fnDelete(){}

  fnVer(){}

}
