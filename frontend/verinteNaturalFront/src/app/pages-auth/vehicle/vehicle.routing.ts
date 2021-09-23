import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { VehicleRoutingComponent } from './vehicle-routing/vehicle-routing.component';
import { VehicleControlComponent } from './vehicle-control/vehicle-control.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
export const routesVehicle: Routes = [
    {
        path:'',
        component: VehicleRoutingComponent,
        children: [
            { path:'', redirectTo:'control', pathMatch:'full' },
            { path:'control', component:VehicleControlComponent },
            { path:'new', component:VehicleNewComponent },
            { path:'edit/:id', component:VehicleEditComponent }
        ]
    }
]