import { NgModule } from "@angular/core";
import { VehicleTypeRoutingComponent } from './vehicle-type-routing/vehicle-type-routing.component';
import { VehicleTypeControlComponent } from './vehicle-type-control/vehicle-type-control.component';
import { VehicleTypeEditComponent } from './vehicle-type-edit/vehicle-type-edit.component';
import { VehicleTypeNewComponent } from './vehicle-type-new/vehicle-type-new.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesVehicleType } from "./vehicle-type.routing";

@NgModule({
    declarations:[VehicleTypeRoutingComponent, VehicleTypeControlComponent, VehicleTypeEditComponent, VehicleTypeNewComponent],
    imports:[
        NgbModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routesVehicleType)
    ]
})

export class VehicleTypeModule {}