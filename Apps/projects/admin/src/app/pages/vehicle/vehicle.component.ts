import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  arrayVehicles = [];

  constructor() { }

  ngOnInit(): void {
    this.fnLoadVehicles();
  }
  fnLoadVehicles(){}

  fnDelete(){}
  fnEdit(){}
  fnVer(){}

}
