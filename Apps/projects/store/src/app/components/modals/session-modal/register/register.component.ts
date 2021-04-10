import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionService } from 'services/Session/session.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() changeComponent: EventEmitter<any> = new EventEmitter()

  errors: any[] = [];
  hasError = false;
  waitRequest = false;
  registerSuccess = false;
  acceptTerms = false;

  newUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    rfc: new FormControl(null, [Validators.nullValidator]),
    phone_number: new FormControl(null, [Validators.required, Validators.maxLength(13), Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    password_confirmation: new FormControl(null, Validators.required)
  })

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.errors = [];
    this.hasError = false;
    this.waitRequest = false;
    this.registerSuccess = false;
    this.acceptTerms = false;
  }

  onSubmit() {
    this.waitRequest = true;
    let data = this.newUserForm.value;

    data = {
      "name": this.newUserForm.value.name,
      "email": this.newUserForm.value.email,
      "rfc": this.newUserForm.value.rfc ? this.newUserForm.value.rfc.toUpperCase() : '',
      "phone_number": this.newUserForm.value.phone_number,
      "password": this.newUserForm.value.password,
      "password_confirmation": this.newUserForm.value.password_confirmation
    }

    this.sessionService.register(data)
      .then(res => {
        this.waitRequest = false;
        this.registerSuccess = true;
        this.newUserForm = new FormGroup({
          name: new FormControl(null, [Validators.required]),
          rfc: new FormControl(null, [Validators.nullValidator]),
          phone_number: new FormControl(null, [Validators.required, Validators.maxLength(13), Validators.minLength(5)]),
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [Validators.required]),
          password_confirmation: new FormControl(null, Validators.required)
        })
      }).catch(err => {
        this.waitRequest = false;
        this.errors = err.error.errors
      })

  }

  goToLogin() {
    this.changeComponent.emit(0)
  }

  checkError(field: String) {
    return this.errors[field.toString()] ?? false
  }

  checkboxValue(checked: boolean) {
    this.acceptTerms = checked;
  }
}
