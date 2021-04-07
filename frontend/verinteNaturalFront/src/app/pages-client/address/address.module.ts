import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { routesAddress } from './address.routing';
import { AddressControlComponent } from './address-control/address-control.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { AddressNewComponent } from './address-new/address-new.component';
import { AddressRoutingComponent } from './address-routing/address-routing.component';

@NgModule({
    declarations: [
        AddressControlComponent,
        AddressEditComponent,
        AddressNewComponent,
        AddressRoutingComponent
    ],
    imports:[
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routesAddress)
    ]
})
export class AddressModule {}