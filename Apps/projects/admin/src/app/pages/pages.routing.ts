import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutingComponent } from './pages-routing/pages-routing.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { DriverComponent } from './driver/driver.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehouseTypeComponent } from './warehouse-type/warehouse-type.component';
import { ProviderComponent } from './provider/provider.component';
import { IncidentComponent } from './incident/incident.component';
import { BatchComponent } from './batch/batch.component';
import { ReportComponent } from './report/report.component';
import { RequisitionsComponent } from './requisitions/requisitions.component';
import { UnitComponent } from './unit/unit.component';
export const pagesRoutes: Routes = [{
    path:'',
    component:PagesRoutingComponent,
    children:[
        { path:'',redirectTo:'home',pathMatch:'full' },
        { path:'home', component:HomeComponent },
        { path:'user', component:UserComponent },
        { path:'client', component:ClientComponent },
        { path:'product', component:ProductComponent },
        { path:'product-type', component:ProductTypeComponent },
        { path:'driver', component:DriverComponent },
        { path:'vehicle', component:VehicleComponent },
        { path:'vehicle-type', component:VehicleTypeComponent },
        { path:'warehouse', component:WarehouseComponent },
        { path:'warehouse-type', component:WarehouseTypeComponent },
        { path:'provider', component:ProviderComponent },
        { path:'incident', component:IncidentComponent },
        { path:'batch', component:BatchComponent },
        { path:'report', component:ReportComponent },
        { path:'requisitions', component:RequisitionsComponent },
        { path:'units', component:UnitComponent },
    ]
}];