import { ClientControlComponent } from './client-control/client-control.component';
import { Routes } from '@angular/router';
import { ClientRoutingComponent } from './client-routing/client-routing.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientEditComponent } from './client-edit/client-edit.component';


export const routesClient: Routes = [
    {
        path: '',
        component: ClientRoutingComponent,
        children: [
            { path:'',redirectTo:'control', pathMatch:'full' },
            { path:'control', component: ClientControlComponent },
            { path:'new', component: ClientNewComponent },
            { path:'edit/:id', component: ClientEditComponent }
        ]
    }
]