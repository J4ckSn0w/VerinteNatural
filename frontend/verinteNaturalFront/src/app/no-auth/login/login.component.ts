import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LOGIN_STATE_ENUM } from '../../emun/login-state.enum';
import { SessionService } from '../../services/session.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sub_auth: Subscription;

  loginForm = new FormGroup({
    correo: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private loginService: LoginService
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
      this.router.navigate(["system/home"]); //Redirigimos a la ruta principal 
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
      client_secret: "U8Y4qKL80TEhZrtXLNgmwSWQ9Pp9S0xa72KuG9UK",
      username: this.loginForm.value.correo,
      password: this.loginForm.value.password
    };
    
    this.loginService.fnPostLogin(data)
    .then(() => {
    })
    .catch(err => {
      console.log('Entre aqui');
      this.toastr.error("Hubo un error con los datos, favor de revisarlos.");
      this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.VALIDATION_ERROR);
    });
  }

}
