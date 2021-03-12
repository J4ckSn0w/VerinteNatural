import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
/*import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';*/
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;

  public passwordVerify: boolean;

  newUserForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    rfc: new FormControl(null, [Validators.required]),
    numero: new FormControl(null, [Validators.required,Validators.maxLength(13)]),
    correo: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    passwordVerify: new FormControl(null, Validators.required)
  })

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    console.log(this.newUserForm.value);
    console.log(this.newUserForm);
    let data = this.newUserForm.value;
    if(this.newUserForm.get('password').value != this.newUserForm.get('passwordVerify').value){
      this.toastr.error("Las contraseñas deben ser iguales");
      return;
    }
    
    this.userService.fnPostNewUser(data)
    .then((res) => {
      this.toastr.success(res);
    })
    .catch(err => {
      this.toastr.error(err);
    })
    
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

}
