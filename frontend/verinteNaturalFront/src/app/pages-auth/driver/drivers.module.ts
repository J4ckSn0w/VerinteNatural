import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DriverRoutingComponent } from './driver-routing/driver-routing.component';
import { DriverControlComponent } from './driver-control/driver-control.component';
import { DriverNewComponent } from './driver-new/driver-new.component';
import { DriverEditComponent } from './driver-edit/driver-edit.component';
import { RouterModule } from '@angular/router';
import { routesDrivers } from './drivers.routing';


@NgModule({
    declarations:[DriverRoutingComponent, DriverControlComponent, DriverNewComponent, DriverEditComponent],
    imports:[
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forChild(routesDrivers)
    ]
})

export class DriverModule {}