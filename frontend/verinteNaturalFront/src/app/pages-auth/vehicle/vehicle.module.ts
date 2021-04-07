import { NgModule } from "@angular/core";
import { VehicleControlComponent } from './vehicle-control/vehicle-control.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleRoutingComponent } from './vehicle-routing/vehicle-routing.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesVehicle } from './vehicle.routing';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [VehicleControlComponent, VehicleNewComponent, VehicleEditComponent, VehicleRoutingComponent],
    imports:[
        NgbModule,
        CommonModule,
        RouterModule.forChild(routesVehicle),
        NgbModalModule,
        ReactiveFormsModule
    ]
})

export class VehicleModule {}