import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {
  arrayVehiclesTypes = [];

  constructor() { }

  ngOnInit(): void {
    this.fnLoadVehicleTypes();
  }

  fnDelete(){}
  fnVer(){}
  fnEdit(){}
  fnLoadVehicleTypes(){}

}
