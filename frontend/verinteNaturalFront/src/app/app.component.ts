import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { LOGIN_STATE_ENUM } from './emun/login-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'verinteNaturalFront';
  
  constructor(
    private sessionService: SessionService,
    private loginService: LoginService,
    private router: Router
  ){}

  ngOnInit(): void {
    
    let token = this.sessionService.fnGetSessionToken();
        if(token){
            this.loginService.fnTokenLoginUser([],'/api/info')
            .then(() => {})
            .catch((err) => {})
        }else{
            this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.LOGOUT);
        }
  }

}
