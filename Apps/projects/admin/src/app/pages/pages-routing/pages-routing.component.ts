import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages-routing',
  templateUrl: './pages-routing.component.html',
  styleUrls: ['./pages-routing.component.css']
})
export class PagesRoutingComponent implements OnInit {

  constructor() { 
    console.log('ROUTING');
  }

  ngOnInit(): void {
  }

}
