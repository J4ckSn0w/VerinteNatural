import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from 'services/Session/session.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private logsSubscription: Subscription
  isLogged: any;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.logsSubscription = this.sessionService.isLogged.subscribe(res => {
      this.isLogged = res
      if (!this.isLogged) this.router.navigate(['/'])
    })
  }

  ngOnDestroy() {
    if (this.logsSubscription) this.logsSubscription.unsubscribe()
  }

}
