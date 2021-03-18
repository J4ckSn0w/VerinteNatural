import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Subscriber, Subscription } from 'rxjs';
import { LOGIN_STATE_ENUM } from '../../emun/login-state.enum';

@Component({
  selector: 'app-home-system',
  templateUrl: './home-system.component.html',
  styleUrls: ['./home-system.component.css']
})
export class HomeSystemComponent implements OnInit {

  sub_auth: Subscription;

  constructor(
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    //console.log('Entre a ngOnInit de Home System.');
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
