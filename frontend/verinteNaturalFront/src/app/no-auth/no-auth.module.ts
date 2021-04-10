import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { NoAuthRoutesComponent } from './no-auth-routes/no-auth-routes.component';
import { RouterModule, Router } from '@angular/router';
import { routesNoAuth } from './no-auth.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    declarations: [
        ErrorComponent,
        NoAuthRoutesComponent,
        ForgottenPasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routesNoAuth),
        ReactiveFormsModule,
        SweetAlert2Module,
        FormsModule,
    
    ]
})
export class NoAuthModule { }