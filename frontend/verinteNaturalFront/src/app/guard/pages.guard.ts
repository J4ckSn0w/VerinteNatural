import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SessionService } from '../services/session.service';


@Injectable({
    providedIn: 'root'
})
export class PagesGuard implements CanActivate{
    constructor(
        private router: Router,
        private sessionService: SessionService
    ){}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return new Promise(resolve => {
            let check: boolean = true;
            const sub_session: Subscription = this.sessionService._permissions.subscribe(
                data => {
                    if(data && !check){
                        check = true;
                        if(data.tipoUsuario == 0){
                            resolve(true);
                        }else{
                            this.router.navigate(['/system/home']);
                            resolve(false);
                        }
                    }
                }
            )
            setTimeout(() => {
            if(!check){
                this.router.navigate(['/system/home']);
                resolve(false);
            }
            if(sub_session){
                sub_session.unsubscribe();
            }
        },5000);
    });
        
    }
}