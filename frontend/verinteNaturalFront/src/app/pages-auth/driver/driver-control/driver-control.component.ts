import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../services/driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-control',
  templateUrl: './driver-control.component.html',
  styleUrls: ['./driver-control.component.css']
})
export class DriverControlComponent implements OnInit {

  arrayDrivers = [];

  constructor(
    private driverService : DriverService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  fnLoadDrivers(){
    this.arrayDrivers = [];
    this.driverService.fnGetDrivers()
    .then(res =>{
      res.data.forEach(element => {
        this.arrayDrivers.push(element);
      });
    })
    .catch(rej =>{

    })
  }

  fnEdit(id){

  }

  fnDelete(id){
    
  }

}
