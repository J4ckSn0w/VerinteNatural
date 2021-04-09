import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  arrayDrivers = [];

  constructor() { }

  ngOnInit(): void {
    this.fnLoadDrivers();
  }

  fnEdit(){}
  fnDelete(){}
  fnVer(){}
  fnLoadDrivers(){}

}
