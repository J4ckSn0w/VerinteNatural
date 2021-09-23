import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from 'services/Session/session.service'
import { Router } from '@angular/router'
import { UserService } from 'services/User/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private logsSubscription: Subscription
  private profileSubscription: Subscription
  isLogged: any;
  user: any = {
    name: '',
    email: '',
    phone_number: ''
  }

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private profileData: UserService
  ) { }

  ngOnInit(): void {

    //Get user data profile
    this.profileSubscription = this.profileData.profileData().subscribe((res: any) => {
      this.user = res.data;
    }, err => {
      console.log(err)
    })

    // Ask if user is loggin
    this.logsSubscription = this.sessionService.isLogged.subscribe(res => {
      this.isLogged = res
      if (!this.isLogged) this.router.navigate(['/'])
    })
  }

  ngOnDestroy() {
    if (this.logsSubscription) this.logsSubscription.unsubscribe()
    if (this.profileSubscription) this.profileSubscription.unsubscribe()
  }

}
