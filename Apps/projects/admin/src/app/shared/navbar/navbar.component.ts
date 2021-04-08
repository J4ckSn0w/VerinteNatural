import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/sessionService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
  }

  fnLogout() {
    this.sessionService.fnLogOut();
    this.router.navigate(['/']);
}

}
