import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionService } from 'services/Session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() changeComponent: EventEmitter<any> = new EventEmitter()
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter()

  waitRequest = false;
  hasError = false;
  errors: any[] = [];
  // private loginRequest: Subscription

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void { }

  // ngOnDestroy(): void {
  //   if (this.loginRequest) this.loginRequest.unsubscribe()
  // }

  onSubmit() {

    this.waitRequest = true;
    this.hasError = false;

    this.sessionService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).then((res: any) => {
      // Close modal
      this.sessionService.isLogged.emit(res)
      this.sessionService.saveSessionToken(res.accessToken)
      this.closeModal()
      this.waitRequest = false;
    }).catch(err => {
      this.waitRequest = false;
      this.hasError = true;
      this.errors = err.error.errors ?? [];
    })
  }

  toRecoverPassword() {
    this.changeComponent.emit(2);
  }

  closeModal() {
    this.closeModalEvent.emit(null)
  }

  toRegister() {
    this.changeComponent.emit(1);
  }

  checkError(field: String) {
    return this.errors[field.toString()]
  }

}
