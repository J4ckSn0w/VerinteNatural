import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-steps',
  templateUrl: './order-steps.component.html',
  styleUrls: ['./order-steps.component.css']
})
export class OrderStepsComponent implements OnInit {

  total: number = 764;

  constructor() { }

  ngOnInit(): void {
  }



}
