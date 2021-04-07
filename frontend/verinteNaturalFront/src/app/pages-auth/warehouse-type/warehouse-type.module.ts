import { NgModule } from "@angular/core";
import { WarehouseTypeRoutingComponent } from './warehouse-type-routing/warehouse-type-routing.component';
import { WarehouseTypeControlComponent } from './warehouse-type-control/warehouse-type-control.component';
import { WarehouseTypeNewComponent } from './warehouse-type-new/warehouse-type-new.component';
import { WarehouseTypeEditComponent } from './warehouse-type-edit/warehouse-type-edit.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { routesWarehouseTypes } from './warehouse-type.routing';

@NgModule({
    declarations:[WarehouseTypeRoutingComponent, WarehouseTypeControlComponent, WarehouseTypeNewComponent, WarehouseTypeEditComponent],
    imports:[
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forChild(routesWarehouseTypes)
    ]
})

export class WarehouseTypeModule {}