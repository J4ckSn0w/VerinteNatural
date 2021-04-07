import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { WarehouseRoutingComponent } from './warehouse-routing/warehouse-routing.component';
import { WarehouseControlComponent } from './warehouse-control/warehouse-control.component';
import { WarehouseEditComponent } from './warehouse-edit/warehouse-edit.component';
import { WarehouseNewComponent } from './warehouse-new/warehouse-new.component';
import { RouterModule } from '@angular/router';
import { routesWarehouse } from './warehouse.routing';

@NgModule({
    declarations: [WarehouseRoutingComponent, WarehouseControlComponent, WarehouseEditComponent, WarehouseNewComponent],
    imports:[
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routesWarehouse)
    ]
})

export class WarehouseModule { }