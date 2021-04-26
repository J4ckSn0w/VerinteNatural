import { Component, OnInit } from '@angular/core';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from '../../services/vehicle.service';
import { DriverService } from '../../services/driver.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  firstDate: NgbDateStruct;
  lastDate: NgbDateStruct;

  myFirstDate;
  myLastDate;

  errorFecha = false;

  arrayViews = ['Compras','Gasolina','Otro'];
  currentView = 1;

  showDetails = false;

  constructor(
    private vehicleService: VehicleService,
    private driverService:DriverService,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.fnLoadInfo();
  }

  arrayVehicles = [];

  arrayReports = [];

  currentVehicule = {
    id:''
  }

  totalExpense = 0;

  fnLoadInfo(){
    this.arrayVehicles = [];
    this.vehicleService.fnGetVehicles()
    .then(res => {
      console.log('Vehiculos');
      console.log(res);
      res.data.forEach(element => {
        this.arrayVehicles.push(element);
      })
    });
  }

  fnGetByDates(){
    this.errorFecha = false;
    console.log('Primera fecha');
    console.log(this.firstDate);
    console.log('Segunda fecha');
    console.log(this.lastDate);
  }

  fnDetalle(id){
    if(this.firstDate == undefined || this.lastDate == undefined)
    {
      this.errorFecha = true;
      return;
    }
    if(this.firstDate.year > this.lastDate.year){
      console.log('Año menor');
      this.errorFecha = true;
      return;
    }
    else{
      if(this.firstDate.month > this.lastDate.month){
        console.log('Mes menor');
        this.errorFecha = true;
        return;
      }
      else{
        if((this.firstDate.day > this.lastDate.day) && this.firstDate.month == this.lastDate.month){
          console.log('Dia es menor');
          this.errorFecha = true;
          return;
        }
        console.log(this.firstDate);
        console.log(this.lastDate);
        console.log('ULTIMO');
      }
    }
    this.arrayReports = [];
    let firstDate = this.firstDate.year + '-' + (this.firstDate.month < 10 ? ('0') : '') + this.firstDate.month + '-' + this.firstDate.day;
    let lastDate = this.lastDate.year + '-' + (this.lastDate.month < 10 ? ('0') : '') + this.firstDate.month + '-'  + this.lastDate.day;
    console.log(firstDate);
    console.log(lastDate);
    this.myFirstDate = firstDate;
    this.myLastDate = firstDate;
    this.vehicleService.fnGetKilometer(id,firstDate,lastDate)
    .then(res => {
      console.log('DATAAA');
      console.log(res);
      res.data.forEach(element => {
        this.arrayReports.push(element);
        this.totalExpense += (element.fuel_cost * element.spent_fuel);
      });
      this.currentVehicule.id = id;
    })
    .catch(rej => {
      console.log('ERROR');
      console.log(rej);
    })
    this.showDetails = true;
  }

  fnRegresar(){
    this.fnLoadInfo();
    this.showDetails = false;
    this.totalExpense = 0;
  }

  fnCreateReport(){
    let firstDate = this.firstDate.year + '-' + (this.firstDate.month < 10 ? ('0') : '') + this.firstDate.month + '-' + this.firstDate.day;
    let lastDate = this.lastDate.year + '-' + (this.lastDate.month < 10 ? ('0') : '') + this.firstDate.month + '-'  + this.lastDate.day;
    //window.open('localhost:3000/api/_p1/vehicles/report/'+this.currentVehicule.id+'/'+firstDate+'/'+lastDate,"_blank");
    this.reportService.fnGetReport(this.currentVehicule.id,firstDate,lastDate)
    .then(res => {
      console.log('TODO BIEN');
      console.log(res);
    })
    .catch(rej => {
      console.log('ALGO SALIO MAL');
      console.log(rej);
    })
  }
}
