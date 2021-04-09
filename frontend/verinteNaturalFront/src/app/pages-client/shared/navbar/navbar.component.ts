import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login = false;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnLoadSession();
  }

  fnLoadSession() {
    let userToken = this.sessionService.fnGetSessionToken();
    console.log('userToken');
    console.log(userToken);
    if (userToken == null) {
      this.login = false;
    }
    else {
      this.login = true;
    }
  }

  fnLogIn() {
    this.router.navigate(["/auth/login"]);
  }

  fnLogOut() {
    console.log('Entre a la funcion LogOut');
    this.sessionService.fnLogOut();
    this.router.navigate(['/']);
  }

}
