import { Routes } from '@angular/router';
import { ProductRoutingComponent } from './product-routing/product-routing.component';
import { ProductControlComponent } from './product-control/product-control.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
export const routesProducts: Routes = [
    {
        path:'',
        component: ProductRoutingComponent,
        children: [
            { path:'', redirectTo:'control',pathMatch:'full' },
            { path:'control', component:ProductControlComponent },
            { path:'new', component:ProductNewComponent },
            { path:'edit/:id', component:ProductEditComponent }
        ]
    }
]