import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-auth-routes',
  templateUrl: './no-auth-routes.component.html',
  styleUrls: ['./no-auth-routes.component.css']
})
export class NoAuthRoutesComponent implements OnInit {

  constructor() { 
    console.log("AuthPage");
  }

  ngOnInit(): void {
  }

}
