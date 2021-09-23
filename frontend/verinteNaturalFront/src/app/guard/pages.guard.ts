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

    canActivate(route: ActivatedRouteSnapshot, myData : any): Observable<boolean> | Promise<boolean> | boolean{
        //return true;
        return new Promise(resolve => {
            //console.log('Entre a Pages guard');
            let check: boolean = false;
            const sub_session: Subscription = this.sessionService._permissions.subscribe(
                data => {
                    if(data && !check){
                        check = true;
                        console.log(data.user_type_id);
                        console.log(route.data.permissions);
                        if(data.user_type_id == 1 || route.data.permissions == data.user_type_id){
                            console.log('Entre a if');
                            resolve(true);
                        }else{
                            this.router.navigate(['/store/home']);
                            resolve(false);
                        }
                        resolve(true);
                    }
                }
            )
            setTimeout(() => {
            if(!check){
                this.router.navigate(['/store/home']);
                resolve(false);
            }
            if(sub_session){
                sub_session.unsubscribe();
            }
        },5000);
    });
        
    }
}