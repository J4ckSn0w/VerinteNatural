import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOGIN_STATE_ENUM } from '../../enum/login-state.enum';
import { LoginResponseModel } from '../models/login-response.model';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    //variables
    private $num_hasAccess:BehaviorSubject<number> = new BehaviorSubject<number>(LOGIN_STATE_ENUM.CHECKING);
    _num_hasAccess:Observable<number> = this.$num_hasAccess.asObservable();

    private $permission:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    _permissions:Observable<any> = this.$permission.asObservable();

    $logged:BehaviorSubject<LoginResponseModel> = new BehaviorSubject<LoginResponseModel>(null);
    _logged:Observable<LoginResponseModel> = this.$logged.asObservable();
    
    constructor() {}

    fnSaveSession(any_logindata:any, saveToken:boolean = true):void{
        this.$permission.next(any_logindata);
        //console.log('Dentro de save session');
        //console.log(this.$permission);
        this.$num_hasAccess.next(LOGIN_STATE_ENUM.LOGGED);
        //console.log('valor dentro de fnSaveSession: '+this.$num_hasAccess.value);
        if(saveToken){
            localStorage.setItem("authorization",any_logindata.accessToken);
        }

        this.$logged.next(any_logindata);
    }

    fnGetSessionToken():string{
        //console.log('Entre a fnGetSessionToken.');
        let token = localStorage.getItem("authorization");
        //console.log('Token guardao en local Storage: ' + token);
        if(token){
            //console.log('Entre a el if de token');
            return (token == undefined)?null:token;
        }
        return null;
    }

    fnSetLoginStateValue(num_state:number):void{
        this.$num_hasAccess.next(num_state);
    }

    fnLogOut():void{
        this.$logged.next(null);
        this.$permission.next(null);
        localStorage.removeItem("authorization");
    }

}