import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './../../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  @Output() changeComponent: EventEmitter<any> = new EventEmitter()

  hasError = false;
  isEmailSent = false;
  waitRequest = false;
  errors: any[] = [];

  recoverForm = new FormGroup({
    username: new FormControl(null, [Validators.required])
  });

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.waitRequest = true;
    this.hasError = false;
    let data = {
      username: this.recoverForm.value.username
    };
    this.loginService.fnPasswordRecovery(data)
      .then(res => {
        this.isEmailSent = true;
      })
      .catch(err => {
        this.errors = err.error.errors;
        if (this.errors) this.hasError = true;
        this.waitRequest = false;
      });
  }

  goToLogin() {
    this.changeComponent.emit(0)
  }

  checkError(field: String) {
    return this.errors[field.toString()]
  }

}
