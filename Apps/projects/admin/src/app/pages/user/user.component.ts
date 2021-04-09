import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  newUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(13)]),
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    user_type: new FormControl(1, Validators.required),
    warehouse_id: new FormControl(null,[Validators.required])
  });

  //Modal
  closeResult = '';

  arrayUser = [];

  constructor(
    private router:Router,
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fnGetAllUser();
  }

  fnGetAllUser(){
    this.arrayUser = [];
    this.userService.fnGetUsers()
    .then((resolve) => {
      resolve.data.forEach(element => {
        this.arrayUser.push(element);
      });
    })
    .catch(reject => {
      console.log('reject' + reject);
    })
  }

  fnEdit(){}
  fnVer(){}
  fnDelete(){}

  fnNew(content){
    console.log('Ando por aca');
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Close with: ${result}`;
    })
  }

}
