import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'views/profile/profile.component';
import { AddressesComponent } from 'components/profile/addresses/addresses.component';
import { MyOrdersComponent } from 'components/profile/my-orders/my-orders.component';
import { MyPendingsOrdersComponent } from 'components/profile/my-pendings-orders/my-pendings-orders.component';

const routes: Routes = [
    {
        path: '', component: ProfileComponent, children: [
            {
                path: '',
                component: AddressesComponent
            },
            {
                path: 'orders',
                component: MyOrdersComponent
            },
            {
                path: 'orders-on-process',
                component: MyPendingsOrdersComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }