import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { ProfileComponent } from 'views/profile/profile.component'

import { ProfileRoutingModule } from 'views/profile/profile-routing.module';
import { AddressesComponent } from 'components/profile/addresses/addresses.component'
import { MyOrdersComponent } from 'components/profile/my-orders/my-orders.component'
import { MyPendingsOrdersComponent } from 'components/profile/my-pendings-orders/my-pendings-orders.component'
import { UserDataComponent } from 'components/profile/user-data/user-data.component'
import { ChangePasswordComponent } from 'components/profile/change-password/change-password.component'

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
    ],
    declarations: [
        ProfileComponent,
        AddressesComponent,
        MyOrdersComponent,
        MyPendingsOrdersComponent,
        UserDataComponent,
        ChangePasswordComponent,
    ]
})
export class ProfileModule { }