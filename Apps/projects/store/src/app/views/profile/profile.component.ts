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
  name: string = ''
  email: string = ''
  phone_number: string = ''

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionService.checkAuthUser()
    this.logsSubscription = this.sessionService.isLogged.subscribe(res => {
      this.isLogged = res
      if (!this.isLogged) this.router.navigate(['/'])
      else {
        this.name = this.isLogged.name
        this.email = this.isLogged.email
        this.phone_number = this.isLogged.phone_number
      }
    })
  }

  ngOnDestroy() {
    if (this.logsSubscription) this.logsSubscription.unsubscribe()
  }

}
