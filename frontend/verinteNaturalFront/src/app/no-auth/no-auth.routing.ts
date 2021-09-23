import { Routes } from '@angular/router';
import { NoAuthRoutesComponent } from './no-auth-routes/no-auth-routes.component';
//import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';

export const routesNoAuth: Routes = [
    {
        path: '', component: NoAuthRoutesComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            // { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'error', component: ErrorComponent },
            { path: 'password', component: ForgottenPasswordComponent }
        ]
    }
]