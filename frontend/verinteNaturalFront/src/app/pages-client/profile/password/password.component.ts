import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  editPasswordForm = new FormGroup({
    current_password: new FormControl(null,[Validators.required]),
    new_password: new FormControl(null,[Validators.required]),
    new_password_confirmation: new FormControl(null,[Validators.required])
  });

  constructor(
    private router: Router,
    private clientService:ClientService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data = {
      current_password:this.editPasswordForm.value.current_password,
      new_password: this.editPasswordForm.value.new_password,
      new_password_confirmation: this.editPasswordForm.value.new_password_confirmation
    };

    this.clientService.fnUpdatePassword(data)
    .then(res =>{
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito cambio exitosamente la contraseña',
        didClose:() => {
          this.router.navigate(["/store/profile"]);
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Hubo un error al intentar editar la contraseña'
      })
    })
  }

}
