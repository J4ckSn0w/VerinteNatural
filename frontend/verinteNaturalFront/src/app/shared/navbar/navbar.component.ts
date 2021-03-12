import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sub_user: Subscription;

  userData;
  tipoUsuario = 1;

  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(private router: Router, private sessionService: SessionService) {
  }

  ngOnInit() {
    /*
      this.fnSubscribeToUser();

      this.router.events.subscribe((event) => {
          this.isCollapsed = true;
          if (event instanceof NavigationStart) {
              if (event.url != this.lastPoppedUrl)
                  this.yScrollStack.push(window.scrollY);
          } else if (event instanceof NavigationEnd) {
              if (event.url == this.lastPoppedUrl) {
                  this.lastPoppedUrl = undefined;
                  window.scrollTo(0, this.yScrollStack.pop());
              } else
                  window.scrollTo(0, 0);
          }
      });
      this.location.subscribe((ev: PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });*/
  }

  fnLogout() {
      this.sessionService.fnLogOut();
      this.router.navigate(['/']);
  }

}
