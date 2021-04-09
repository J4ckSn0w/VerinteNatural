import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/sessionService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = false;

  constructor(
    private router: Router,
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
    this.fnSesionIniciada();
  }

  fnSesionIniciada(){
    let valor = localStorage.getItem("authorization");
    console.log('Valor');
    console.log(valor);
    if(localStorage.getItem("authorization")){
      console.log('Entre al true');
      this.logged = true;
    }else{
      console.log('Entre a false');
      this.logged = false;
    }
  }

  fnLogout() {
    this.sessionService.fnLogOut();
    this.router.navigate(['/']);
}

}
