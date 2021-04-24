import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  constructor(
    private unitService:UnitService
  ) { }

  arrayUnits = [];

  ngOnInit(): void {
    this.fnLoadUnits();
  }

  fnLoadUnits(){
    this.arrayUnits = [];
    this.unitService.fnGetUnits()
    .then(res => {
      res.data.forEach(element => {
        this.arrayUnits.push(element);
      })
    })
    .catch(rej => {
      console.log('Algo salio mal');
      console.log(rej);
    })
  }

  fnVer(id){}

  fnEdit(id){}

  fnNew(){}

  onSubmitNew(){}

  onSubmitEdit(){}

}
