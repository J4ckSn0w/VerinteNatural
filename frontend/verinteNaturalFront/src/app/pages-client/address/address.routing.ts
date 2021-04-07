import { Routes } from '@angular/router';
import { AddressRoutingComponent } from './address-routing/address-routing.component';
import { AddressControlComponent } from './address-control/address-control.component';
import { AddressNewComponent } from './address-new/address-new.component';
import { AddressEditComponent } from './address-edit/address-edit.component';

export const routesAddress: Routes = [{
    path: '',
    component: AddressRoutingComponent,
    children: [
        { path:'', redirectTo:'control', pathMatch:'full' },
        { path:'control', component: AddressControlComponent },
        { path:'new', component: AddressNewComponent },
        { path:'edit/:id', component: AddressEditComponent }
    ]
}]