import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { NoAuthRoutesComponent } from './no-auth-routes/no-auth-routes.component';
import { RouterModule, Router } from '@angular/router';
import { routesNoAuth } from './no-auth.routing';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ErrorComponent,
        NoAuthRoutesComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routesNoAuth),
        ReactiveFormsModule
    ]
})
export class NoAuthModule { }