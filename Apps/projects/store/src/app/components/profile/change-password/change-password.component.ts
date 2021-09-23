import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SessionService } from 'services/Session/session.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isOpen: boolean;
  current_password: string
  new_password: string
  new_password_confirmation: string
  errors: any[] = []
  isChanged = false;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.isOpen = false;
  }

  // Open or close form to change password
  openOrCloseForm() {
    this.isOpen = !this.isOpen
    this.current_password = '';
    this.new_password = '';
    this.new_password_confirmation = ''
    this.isChanged = false;
    this.errors = [];
  }

  changePassword(): void {
    this.sessionService.changePassword({
      current_password: this.current_password,
      new_password: this.new_password,
      new_password_confirmation: this.new_password_confirmation
    }).then((res: any) => {
      this.isOpen = false;
      this.isChanged = true;
    }).catch(err => {
      this.errors = err.error.errors
    });
  }

  checkError(field: string) {
    return this.errors[field] ?? false
  }



}
