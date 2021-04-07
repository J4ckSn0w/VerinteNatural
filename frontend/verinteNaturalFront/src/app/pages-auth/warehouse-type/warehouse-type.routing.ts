import { Routes } from '@angular/router';
import { WarehouseTypeRoutingComponent } from './warehouse-type-routing/warehouse-type-routing.component';
import { WarehouseTypeControlComponent } from './warehouse-type-control/warehouse-type-control.component';
import { WarehouseTypeNewComponent } from './warehouse-type-new/warehouse-type-new.component';
import { WarehouseTypeEditComponent } from './warehouse-type-edit/warehouse-type-edit.component';

export const routesWarehouseTypes : Routes = [
    {
        path:'',
        component:WarehouseTypeRoutingComponent,
        children: [
            { path:'', redirectTo:'control', pathMatch:'full' },
            { path:'control', component: WarehouseTypeControlComponent },
            { path:'new', component: WarehouseTypeNewComponent },
            { path:'edit/:id', component: WarehouseTypeEditComponent }
        ]
    }
]