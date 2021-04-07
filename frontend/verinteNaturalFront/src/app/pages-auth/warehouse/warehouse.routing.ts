import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { WarehouseRoutingComponent } from './warehouse-routing/warehouse-routing.component';
import { WarehouseControlComponent } from './warehouse-control/warehouse-control.component';
import { WarehouseNewComponent } from './warehouse-new/warehouse-new.component';
import { WarehouseEditComponent } from './warehouse-edit/warehouse-edit.component';

export const routesWarehouse: Routes = [
    {
        path:'',
        component: WarehouseRoutingComponent,
        children:[
            { path:'', redirectTo:'control', pathMatch:'full' },
            { path:'control', component:WarehouseControlComponent },
            { path:'new', component:WarehouseNewComponent },
            { path:'edit/:id', component:WarehouseEditComponent }
        ]
    }
];