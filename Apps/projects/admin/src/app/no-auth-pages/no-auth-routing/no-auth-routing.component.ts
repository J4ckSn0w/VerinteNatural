import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-auth-routing',
  templateUrl: './no-auth-routing.component.html',
  styleUrls: ['./no-auth-routing.component.css']
})
export class NoAuthRoutingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Entre al No Auth Constructor');
  }

}
