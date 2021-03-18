import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LOGIN_STATE_ENUM } from '../../emun/login-state.enum';
import { SessionService } from '../../services/session.service';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sub_auth: Subscription;
  userType = 0;

  loginForm = new FormGroup({
    correo: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  /* 
  grant_type: string,
  scope: string,
  client_id: string,
  client_secret: ,
  username:
  password:
  */

  ngOnInit(): void {
    this.fnSubscribeToAuth();
    this.fnCheckLocalStorage();
  }

  fnCheckLocalStorage(){
    if(localStorage.getItem("authorization")){
      console.log("Logeado");
      //Checar el tipo de usuario para mandarlo a su ruta especifica
      this.userService.fnGetUserByToken()
      .then( resolve => {
        switch(resolve.user_type_id){
          case 1:
            this.router.navigate(["system/home"]); //Redirigimos a la ruta principal 
          case 2:
            this.router.navigate(["store/home"]); //Redirigimos a la ruta principal 
        }
      })
      .catch(reject => {

      });
    }
  }

  ngOnDestroy(): void {
    if(this.sub_auth){
      this.sub_auth.unsubscribe();
    }
  }

  fnSubscribeToAuth(){
    console.log("Entre a Subscribe Auth");
    this.sub_auth = this.sessionService._num_hasAccess.subscribe(
      num_state => {
        console.log('Valor de num_state: '+num_state);
        switch(num_state){
          case LOGIN_STATE_ENUM.LOGGED:
            console.log("Logeado");
            this.router.navigate(["system/home"]); //Redirigimos a la ruta principal 
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
    console.log(this.loginForm.value);
    console.log(this.loginForm);

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
      console.log(this.userType);
    })
    .catch(err => {
      console.log('Entre aqui');
      this.toastr.error("Hubo un error con los datos, favor de revisarlos.");
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

}
