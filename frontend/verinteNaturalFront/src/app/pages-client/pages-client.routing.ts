import { Routes } from '@angular/router';
import { PagesClientRoutingComponent } from './pages-client-routing/pages-client-routing.component';
import { HomeComponent } from '././home/home.component';
import { PagesGuard } from '../guard/pages.guard';
import { AddressModule } from './address/address.module';
import { ProfileModule } from './profile/profile.module';

export const routesPagesClient : Routes = [
    {
        path: '',
        component: PagesClientRoutingComponent,
        children: [
            { path:'', redirectTo:'home', pathMatch:'full' },
            { path:'home', component: HomeComponent },
            { path:'address', canActivate:[PagesGuard], loadChildren: () => AddressModule,
            data : {
                permissions: 3
            }},
            { path:'profile', canActivate:[PagesGuard], loadChildren: () => ProfileModule,
            data : {
                permissions: 3
            } }
        ]
    }
]