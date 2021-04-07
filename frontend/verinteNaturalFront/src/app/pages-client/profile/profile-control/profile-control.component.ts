import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-profile-control',
  templateUrl: './profile-control.component.html',
  styleUrls: ['./profile-control.component.css']
})
export class ProfileControlComponent implements OnInit {

  currentUser = {
    name: 'Nombre de Usuario',
    email: 'cliente@email.com',
    phone_number:'4491230000'
  }

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.fnGetData();
  }

  fnGetData(){
    this.clientService.fnUserProfile()
    .then(res => {
      this.currentUser.name = res.data.name,
      this.currentUser.email = res.data.email,
      this.currentUser.phone_number = res.data.phone_number

      console.log(this.currentUser);
    });
  }

  fnEditProfile(){
    this.router.navigate(['/store/profile/edit',0]);
  }

}
