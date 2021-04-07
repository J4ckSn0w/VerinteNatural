import { Routes } from '@angular/router';
import { ProductTypeRoutingComponent } from './product-type-routing/product-type-routing.component';
import { ProductTypeControlComponent } from './product-type-control/product-type-control.component';
import { ProductTypeNewComponent } from './product-type-new/product-type-new.component';
import { ProductTypeEditComponent } from './product-type-edit/product-type-edit.component';

export const routesProductType: Routes = [
    {
        path:'',
        component: ProductTypeRoutingComponent,
        children: [
            { path:'', redirectTo:'control', pathMatch:'full' },
            { path:'control', component:ProductTypeControlComponent },
            { path:'new', component:ProductTypeNewComponent },
            { path:'edit/:id', component:ProductTypeEditComponent }
        ]
    }
]