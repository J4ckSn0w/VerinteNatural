import { Routes } from '@angular/router';
import { PagesAuthRoutingComponent } from './pages-auth-routing/pages-auth-routing.component';
import { HomeSystemComponent } from './home-system/home-system.component';
import { UserRoutingComponent } from './user/user-routing/user-routing.component';
import { UserModule } from './user/user.module';
import { PagesGuard } from '../guard/pages.guard';
import { ClientModule } from './client/client.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ProductModule } from './product/product.module';
import { WarehouseTypeModule } from './warehouse-type/warehouse-type.module';
import { DriverModule } from './driver/drivers.module';


export const routesPagesAuth: Routes = [{
    path: '',
    component: PagesAuthRoutingComponent,
    children: [
        { path:'', redirectTo: 'home', pathMatch:'full' },
        { path:'home', component: HomeSystemComponent },
        { path:'user', canActivate:[PagesGuard], loadChildren: () => UserModule },
        { path:'client', canActivate:[PagesGuard], loadChildren: () => ClientModule },
        { path:'warehouse', canActivate:[PagesGuard], loadChildren: () => WarehouseModule },
        { path:'warehouse-type',canActivate:[PagesGuard], loadChildren:() => WarehouseTypeModule },
        { path:'vehicle', canActivate:[PagesGuard], loadChildren: () => VehicleModule },
        { path:'vehicle-type',canActivate:[PagesGuard], loadChildren: () => VehicleTypeModule },
        { path:'product-type', canActivate:[PagesGuard], loadChildren:() => ProductTypeModule },
        { path:'product', canActivate:[PagesGuard], loadChildren:() => ProductModule },
        { path:'driver', canActivate:[PagesGuard], loadChildren:() => DriverModule }
    ]
}]