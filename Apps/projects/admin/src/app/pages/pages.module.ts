import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from './home/home.component';
import { PagesRoutingComponent } from './pages-routing/pages-routing.component';
import { RouterModule } from "@angular/router";
import { pagesRoutes } from './pages.routing';
import { ClientComponent } from './client/client.component';
import { DriverComponent } from './driver/driver.component';
import { ProductComponent } from './product/product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { UserComponent } from './user/user.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehouseTypeComponent } from './warehouse-type/warehouse-type.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        PagesRoutingComponent,
        ClientComponent,
        DriverComponent,
        ProductComponent,
        ProductTypeComponent,
        UserComponent,
        VehicleComponent,
        VehicleTypeComponent,
        WarehouseComponent,
        WarehouseTypeComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(pagesRoutes),
        NgbModule,
    ]
})

export class PagesModule {}