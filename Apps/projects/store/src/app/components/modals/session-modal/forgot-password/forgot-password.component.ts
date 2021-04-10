import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionService } from 'services/Session/session.service'

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
    private sessionService: SessionService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.waitRequest = true;
    this.hasError = false;
    let data = {
      username: this.recoverForm.value.username
    };
    this.sessionService.recoverPassword(data)
      .then(res => {
        this.isEmailSent = true;
      }).catch(err => {
        this.errors = err.error.errors;
        if (this.errors) this.hasError = true;
        this.waitRequest = false;
      })
  }

  goToLogin() {
    this.changeComponent.emit(0)
  }

  checkError(field: String) {
    return this.errors[field.toString()]
  }

}
