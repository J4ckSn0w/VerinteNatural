import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { LOGIN_STATE_ENUM } from '../emun/login-state.enum';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private sessionService: SessionService
    ){
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<any> | Promise<boolean> | boolean{
        if(!this.sessionService.fnGetSessionToken()){
            this.sessionService.fnLogOut();
            this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.NO_LOGGED);
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
}