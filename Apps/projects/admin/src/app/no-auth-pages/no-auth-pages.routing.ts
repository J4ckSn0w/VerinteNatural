import { Routes } from '@angular/router';
import { NoAuthRoutingComponent } from './no-auth-routing/no-auth-routing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
export const noAuthRoutes : Routes = [
    {
        path:'',
        component:NoAuthRoutingComponent,
        children:[
            { path:'', redirectTo:'login' , pathMatch:'full' },
            { path:'login', component:LoginComponent },
            { path:'register', component:RegisterComponent }
        ]
    }
]