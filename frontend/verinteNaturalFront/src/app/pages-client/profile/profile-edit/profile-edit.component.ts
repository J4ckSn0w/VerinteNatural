import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ClientService } from '../../../services/client.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  currentUser = {
    name: '',
    phone_number:''
  };

  editUserForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    phone_number: new FormControl(null,[Validators.required])
  });

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnLoadUserInfo();
  }

  fnLoadUserInfo(){
    this.clientService.fnUserProfile()
    .then(res => {
      this.currentUser = res.data;
    })
    .catch(rej => {
      console.log('Hubo un error al traer la informacion de usuario');
    })
  }

  onSubmit(){

    let data = {
      name: (this.editUserForm.value.name == undefined) ? this.currentUser.name : this.editUserForm.value.name,
      phone_number: (this.editUserForm.value.phone_number == undefined) ? this.currentUser.phone_number : this.editUserForm.value.phone_number
    };

    this.clientService.fnUpdateProfile(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto',
        text:'Se edito la informacion correctamente',
        didClose: () => {
          this.router.navigate(["/store/profile"]);
        }
      })
    })
    .catch(rej => {

    })
  }

  fnChangePassword(id=0){
    this.router.navigate(["/store/profile/password",id]);
  }

}
