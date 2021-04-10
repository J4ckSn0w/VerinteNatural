import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from '../../services/sessionService.service';

import { LOGIN_STATE_ENUM } from '../../../enum/login-state.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sub_auth: Subscription;

  constructor(
    private sessionService:SessionService
  ) {
    
   }

  ngOnInit(): void {
    this.sub_auth = this.sessionService._num_hasAccess.subscribe(
      num_state => {
        //console.log('Valor de num_state: '+num_state);
        switch(num_state){
          case LOGIN_STATE_ENUM.LOGGED:
            console.log("Logeado");
            break;
          case LOGIN_STATE_ENUM.VALIDATION_ERROR:
            console.log("Error de validacion");
            break;
          case LOGIN_STATE_ENUM.NO_LOGGED:
            console.log("Usuario no ingresado");
            break;
        }
      }
    );
    this.sub_auth.unsubscribe();
  }

}
