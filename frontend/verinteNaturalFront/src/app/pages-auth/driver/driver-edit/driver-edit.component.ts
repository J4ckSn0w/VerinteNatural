import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css']
})
export class DriverEditComponent implements OnInit {

  arrayDriversType = [];
  arrayVehicles = [];
  
  editDriverForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    last_name: new FormControl(null,[Validators.required]),

  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
