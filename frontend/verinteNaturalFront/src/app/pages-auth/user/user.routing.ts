import { Routes } from '@angular/router';
import { UserRoutingComponent } from './user-routing/user-routing.component';
import { UserControlComponent } from './user-control/user-control.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PagesGuard } from '../../guard/pages.guard';

export const routesUser: Routes = [
    {
        path:'',
        component: UserRoutingComponent,
        children: [
            { path:'', redirectTo:'control', pathMatch:'full' },
            { path:'control',component: UserControlComponent },
            { path:'new', component:UserNewComponent },
            { path:'edit/:id', component: UserEditComponent }
        ]
    }
]