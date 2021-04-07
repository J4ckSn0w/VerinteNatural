import { NgModule } from "@angular/core";
import { ProductTypeRoutingComponent } from './product-type-routing/product-type-routing.component';
import { ProductTypeControlComponent } from './product-type-control/product-type-control.component';
import { ProductTypeNewComponent } from './product-type-new/product-type-new.component';
import { ProductTypeEditComponent } from './product-type-edit/product-type-edit.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes, RouterModule } from '@angular/router';
import { routesProductType } from './product-type.routing';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[ProductTypeRoutingComponent, ProductTypeControlComponent, ProductTypeNewComponent, ProductTypeEditComponent],
    imports:[
        CommonModule,
        NgbModule,
        RouterModule.forChild(routesProductType),
        ReactiveFormsModule
    ]
})

export class ProductTypeModule {}