import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { routesProfile } from '../../pages-client/profile/profile.routing';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  emailError = false;

  beforeSend = true;
  afterSend = false;

  passwordForm = new FormGroup({
    username: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let data = {
      username: this.passwordForm.value.username
    };
    this.loginService.fnPasswordRecovery(data)
      .then(res => {
        this.beforeSend = false;
        this.afterSend = true;
      })
      .catch(rej => {

      });
  }

  fnRegister() {
    this.router.navigate(["/auth/register"]);
  }

  fnLogin() {
    this.router.navigate(["/auth/login"]);
  }

}
