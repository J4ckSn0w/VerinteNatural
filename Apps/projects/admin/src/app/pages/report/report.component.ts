import { Component, OnInit } from '@angular/core';

import { NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
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

  tableLoad = false;
  tableLoadReports = false;

  constructor(
    private vehicleService: VehicleService,
    private driverService:DriverService,
    private reportService: ReportService
  ) { }

  today: NgbDate;
  calendar: NgbCalendar;

  ngOnInit(): void {
    this.fnLoadInfo();

    
    const currentDate = new Date();
    const currentDateObj = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth()+1,
      day: String(currentDate.getDate()).padStart(2, '0')
    };
    //this.today = new NgbDate();
    this.firstDate = new NgbDate(currentDateObj.year,currentDateObj.month,Number(currentDateObj.day));
    this.lastDate = new NgbDate(currentDateObj.year,currentDateObj.month,Number(currentDateObj.day));
    //this.today = this.calendar.getToday();
    //console.log('Today');
    //console.log(this.isToday);
    console.log('firstDate');
    console.log(this.firstDate);
  }

  isToday(date: NgbDate) { return this.today.equals(date); }

  arrayVehicles = [];

  arrayReports = [];

  currentVehicule = {
    id:''
  }

  totalExpense = 0;

  fnLoadInfo(){
    this.tableLoad = false;
    this.arrayVehicles = [];
    this.vehicleService.fnGetVehicles()
    .then(res => {
      console.log('Vehiculos');
      console.log(res);
      res.data.forEach(element => {
        this.arrayVehicles.push(element);
      });
      this.tableLoad = true;
    });
  }

  fnGetByDates(){
    this.errorFecha = false;
    console.log('Primera fecha');
    console.log(this.firstDate);
    console.log('Segunda fecha');
    console.log(this.lastDate);
    this.fnDetalle(this.currentVehicule.id);
  }

  fnDetalle(id){
    this.tableLoadReports = false;
    this.arrayReports = [];
    if(this.firstDate == undefined || this.lastDate == undefined)
    {
      this.errorFecha = true;
      return;
    }
    if(this.firstDate.year > this.lastDate.year){
      console.log('Año menor');
      this.errorFecha = true;
      this.tableLoadReports = true;
      return;
    }
    else{
      if(this.firstDate.month > this.lastDate.month){
        console.log('Mes menor');
        this.errorFecha = true;
        this.tableLoadReports = true;
        return;
      }
      else{
        if((this.firstDate.day > this.lastDate.day) && this.firstDate.month == this.lastDate.month){
          console.log('Dia es menor');
          this.errorFecha = true;
          this.tableLoadReports = true;
          return;
        }
      }
    }
    this.totalExpense = 0;
    let firstDate = this.firstDate.year + '-' + (this.firstDate.month < 10 ? ('0') : '') + this.firstDate.month + '-' + this.firstDate.day;
    let lastDate = this.lastDate.year + '-' + (this.lastDate.month < 10 ? ('0') : '') + this.firstDate.month + '-'  + this.lastDate.day;
    console.log(firstDate);
    console.log(lastDate);
    this.myFirstDate = firstDate;
    this.myLastDate = lastDate;
    this.vehicleService.fnGetKilometer(id,firstDate,lastDate)
    .then(res => {
      res.data.forEach(element => {
        this.arrayReports.push(element);
        this.totalExpense += (Number(element.fuel_cost) /** element.spent_fuel*/);
      });
      this.currentVehicule.id = id;
      this.tableLoadReports = true;
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
