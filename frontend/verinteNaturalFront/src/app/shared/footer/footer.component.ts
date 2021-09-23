import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  test : Date = new Date();
    sub_user: Subscription;
    constructor(
        private sessionService: SessionService
     ) {}
     tipoUsuario = 1;
     
    ngOnInit() {
        this.fnSubscribeToUser();
    }
    fnSubscribeToUser(){
        this.sub_user = this.sessionService._permissions.subscribe(
            data => {
                if(data){
                    this.tipoUsuario = data.tipoUsuario;

                }
            }
        )
    }

}
