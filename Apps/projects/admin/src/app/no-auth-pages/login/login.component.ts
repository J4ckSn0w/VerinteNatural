import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/sessionService.service';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LOGIN_STATE_ENUM } from '../../../enum/login-state.enum';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sub_auth: Subscription;
  permission: Subscription;
  userType = 0;

  loginForm = new FormGroup({
    correo: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    //private toastr: ToastrService,
    private sessionService: SessionService,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('Entre al login component');
    this.fnCheckLocalStorage();
  }

  fnCheckLocalStorage(){
    if(localStorage.getItem("authorization")){
      console.log("Logeado");
      //Checar el tipo de usuario para mandarlo a su ruta especifica
      this.userService.fnGetUserByToken()
      .then( resolve => {
        console.log('Tipo de usuario:');
        console.log(resolve.user_type_id);
        switch(resolve.user_type_id){
          case 1:
          case 2:
            this.router.navigate(["admin/home"]); //Redirigimos a la ruta principal 
            break;
          case 3:
            console.log('Entre a el case 4');
            this.router.navigate(["store/home"]); //Redirigimos a la ruta principal 
            break;
          default:
            console.log('Default');
        }
      })
      .catch(reject => {
      });
    }
  }

  fnForgottenPassword(){
    this.router.navigate(["/auth/password"])
  }

  ngOnDestroy(): void {
    if(this.sub_auth){
      this.sub_auth.unsubscribe();
    }
    if(this.permission){
      this.permission.unsubscribe();
    }
  }

  fnSubscribeToAuth(){
    //console.log("Entre a Subscribe Auth");
    this.sub_auth = this.sessionService._num_hasAccess.subscribe(
      num_state => {
        console.log('Valor de num_state: '+num_state);
        switch(num_state){
          case LOGIN_STATE_ENUM.LOGGED:
            console.log("Logeado");
            console.log(this.userType);
            this.permission = this.sessionService._permissions.subscribe(
              data => {
                console.log('Dentro del observable de permisos');
                console.log(data);
                if(data != null || data != undefined){
                  switch(data.user_type_id){
                    case 1:
                      this.router.navigate(["system/home"]); //Redirigimos a la ruta principal
                      break;
                    case 4:
                      this.router.navigate(["store/home"]); //Redirigimos a la ruta principal 
                      break;
                  }
                }
              }
            )
            break;
          case LOGIN_STATE_ENUM.VALIDATION_ERROR:
            console.log("Error de validacion");
            break;
          case LOGIN_STATE_ENUM.NO_LOGGED:
            console.log("Usuario no ingresado");
            break;
        }
      }
    )
  }

  navigate(){
    this.router.navigateByUrl("/auth/register");
  }

  onSubmit(){
    //let data = this.loginForm.value;
    //console.log(this.loginForm.value);
    //console.log(this.loginForm);

    let data = {
      grant_type: "password",
      scope: "*",
      client_id: "2",
      client_secret: environment.client_secret,
      username: this.loginForm.value.correo,
      password: this.loginForm.value.password
    };
    
    this.loginService.fnPostLogin(data)
    .then((response:any) => {
      this.userType = response.user_type_id;
      console.log('User type');
      console.log(this.userType);
      this.router.navigate(["/admin"]);
    })
    .catch(err => {
      console.log('Entre aqui');
      Swal.fire({
        icon:'error',
        title: 'Error!',
        text: 'Verifique la informacion'
      });
      //this.toastr.error("Hubo un error con los datos, favor de revisarlos.");
      this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.VALIDATION_ERROR);
    });
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

  fnRegister(){
    this.router.navigate(['/auth/register']);
  }
}
