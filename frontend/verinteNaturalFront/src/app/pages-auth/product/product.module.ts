import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { ProductRoutingComponent } from './product-routing/product-routing.component';
import { ProductControlComponent } from './product-control/product-control.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { routesProducts } from './product.routing';

@NgModule({
    declarations:[ProductRoutingComponent, ProductControlComponent, ProductNewComponent, ProductEditComponent],
    imports:[
        CommonModule,
        NgbModule,
        RouterModule.forChild(routesProducts),
        ReactiveFormsModule
    ]
})

export class ProductModule {}