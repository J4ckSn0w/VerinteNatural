import { Routes } from '@angular/router';
import { ProfileRoutingComponent } from './profile-routing/profile-routing.component';
import { ProfileControlComponent } from './profile-control/profile-control.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordComponent } from './password/password.component';

export const routesProfile:Routes = [
    {
        path:'',
        component: ProfileRoutingComponent,
        children:[
            { path:'', redirectTo:'control',pathMatch:'full' },
            { path:'control', component: ProfileControlComponent },
            { path:'edit/:id', component: ProfileEditComponent },
            { path:'password/:id',component: PasswordComponent }
        ]
    }
]