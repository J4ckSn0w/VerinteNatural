import { Routes } from '@angular/router';
import { VehicleTypeRoutingComponent } from './vehicle-type-routing/vehicle-type-routing.component';
import { VehicleTypeControlComponent } from './vehicle-type-control/vehicle-type-control.component';
import { VehicleTypeNewComponent } from './vehicle-type-new/vehicle-type-new.component';
import { VehicleTypeEditComponent } from './vehicle-type-edit/vehicle-type-edit.component';

export const routesVehicleType : Routes = [
    {
        path:'',
        component: VehicleTypeRoutingComponent,
        children:[
            { path:'', redirectTo:'control', pathMatch:'full' },
            { path:'control', component:VehicleTypeControlComponent },
            { path:'new', component:VehicleTypeNewComponent },
            { path:'edit/:id', component:VehicleTypeEditComponent }
        ]
    }
]