import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from 'services/Session/session.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private logsSubscription: Subscription
  isLogged: any;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.sessionService.checkAuthUser()
    this.logsSubscription = this.sessionService.isLogged.subscribe(res => {
      this.isLogged = res;
    })
  }

  ngOnDestroy() {
    if (this.logsSubscription) this.logsSubscription.unsubscribe()
  }
}
