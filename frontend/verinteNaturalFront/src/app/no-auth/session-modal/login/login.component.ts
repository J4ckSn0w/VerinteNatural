import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LOGIN_STATE_ENUM } from '../../../emun/login-state.enum';
import { SessionService } from '../../../services/session.service';
import { LoginService } from '../../../services/login.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() changeComponent: EventEmitter<any> = new EventEmitter()
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter()

  sub_auth: Subscription;
  permission: Subscription;
  userType = 0;
  waitRequest = false;
  hasError = false;
  errors: any[] = [];

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(
    private sessionService: SessionService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void { }

  onSubmit() {

    this.waitRequest = true;
    this.hasError = false;

    let data = {
      grant_type: "password",
      scope: "*",
      client_id: "2",
      client_secret: environment.client_secret,
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.loginService.fnPostLogin(data)
      .then((response: any) => {
        //Close modal
        this.sessionService.fnSaveSession(response, true)
        this.closeModal()
        this.waitRequest = false;
      })
      .catch(err => {
        this.waitRequest = false;
        this.hasError = true;
        this.errors = err.error.errors;
      });
  }

  toRecoverPassword() {
    this.changeComponent.emit(2);
  }

  closeModal() {
    console.log('Close modal method')
    this.closeModalEvent.emit(null)
  }

  toRegister() {
    this.changeComponent.emit(1);
  }

  checkError(field: String) {
    return this.errors[field.toString()]
  }

}
