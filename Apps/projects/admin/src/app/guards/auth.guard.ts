import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SessionService } from './../services/sessionService.service';
import { Observable } from 'rxjs';
import { LOGIN_STATE_ENUM } from '../../enum/login-state.enum';

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{
    constructor(
        private sessionService : SessionService,
        private router: Router
    ){

    }

    canActivate():Observable<any> | Promise<any> | boolean {
        if(!this.sessionService.fnGetSessionToken())
        {
            this.sessionService.fnLogOut();
            this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.NO_LOGGED);
            this.router.navigate(["/auth/login"]);
            return false;
        }
        return true;
    }
}