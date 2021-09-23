import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
/*import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';*/
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public error_email = false;
  public error_phone = false;
  public error_rfc = false;
 
  public passwordVerify: boolean;

  newUserForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),    
    numero: new FormControl(null, [Validators.required,Validators.maxLength(13),Validators.minLength(5)]),
    correo: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    passwordVerify: new FormControl(null, Validators.required)
  })

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    //console.log(this.newUserForm.value);
    //console.log(this.newUserForm);
    let data = this.newUserForm.value;
    if(this.newUserForm.get('password').value != this.newUserForm.get('passwordVerify').value){
      this.toastr.error("Las contraseñas deben ser iguales");
      return;
    }

    this.error_rfc = false;
    this.error_phone = false;
    this.error_email = false;

    data = {
      "name": this.newUserForm.value.nombre,
      "email": this.newUserForm.value.correo,
      "rfc": this.newUserForm.value.rfc,
      "phone_number": this.newUserForm.value.numero,
      "password": this.newUserForm.value.password,
      "password_confirmation": this.newUserForm.value.passwordVerify
    }
    console.log(data);
    

    Swal.fire({
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      this.userService.fnPostNewUser(data)
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Se registro correctamente!',
        text: 'Redirigiendo a Inicio de Sesion.',
        onAfterClose: () => {
          this.router.navigate(["auth/login"]);
        }
      });
      //this.toastr.success(res.message);
    })
    .catch(err => {
      console.log(err.error.errors);
      
      let errors = err.error.errors;
      if(errors.email){
        this.error_email = true;
      }
      if(errors.phone_number){
        this.error_phone = true;
      }
      if(errors.rfc){
        this.error_rfc = true;
      }
      })
    });    
  }

  numberOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  letterOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (!(charCode >= 65 && charCode <=120) && (charCode !=32 && charCode != 0)) {
      return false;
    }
    return true;
  }
  goBack(){
    //this.location.back();
  }

  fnSwallAlert(){

    console.log("ENTRE");

    Swal.fire({
      icon: 'success',
      title: 'Se registro correctamente!',
      text: 'Redirigiendo a Inicio de Sesion.',
      footer: '<a href>Why do I have this issue?</a>'
    });
  }

  fnLogin(){
    this.router.navigate(["/auth/login"]);
  }

}
