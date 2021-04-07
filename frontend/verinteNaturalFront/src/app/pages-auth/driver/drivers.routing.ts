import { Routes, Route } from '@angular/router';
import { DriverRoutingComponent } from './driver-routing/driver-routing.component';
import { DriverControlComponent } from './driver-control/driver-control.component';
import { DriverNewComponent } from './driver-new/driver-new.component';
import { DriverEditComponent } from './driver-edit/driver-edit.component';

export const routesDrivers:Routes = [
    {
        path:'',
        component:DriverRoutingComponent,
        children: [
            { path:'', redirectTo:'control',pathMatch:'full' },
            { path:'control', component:DriverControlComponent },
            { path:'new', component:DriverNewComponent },
            { path:'edit/:id', component:DriverEditComponent }
        ]
    }
]