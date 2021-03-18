import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserTypesService } from '../../../services/user-types.service';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  newUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(13)]),
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    user_type: new FormControl(1, Validators.required)
  });

  arrayRoles = [];

  error_email = false;
  error_phone_number = false;
  constructor(
    private userTypeService:UserTypesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnGetAllRoles();
  }

  fnGetAllRoles(){
    this.userTypeService.fnGetUserTypes(null).
    then((resolve) => {
      console.log(resolve);
      resolve.data.forEach(element => {
        this.arrayRoles.push(element);
      });
    })
    .catch((rej) => {
      console.log('Salio algo mal');
      console.log(rej);
    });
  }

  onSubmit(){
    let data = {
        "name": this.newUserForm.value.name,
        "email": this.newUserForm.value.email,
        "phone_number": this.newUserForm.value.phone_number,
        "password": this.newUserForm.value.password,
        "user_type_id": this.newUserForm.value.user_type
      };
      Swal.showLoading();
    
      this.userService.fnPostNewUserA(data)
      .then((resolve) => {
        Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Se registro correctamente!',
          onAfterClose: () => {
            this.router.navigate(["system/user/control"]);
          }
        });
      })
      .catch((reject) => {
        Swal.hideLoading();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error!'
        });
        let errors = reject.error.errors;
        if(errors.email){
          this.error_email = true;
        }
        if(errors.phone_number){
          this.error_phone_number = true;
        }
      });

    }

}
