import { Routes } from '@angular/router';
import { PagesAuthRoutingComponent } from './pages-auth-routing/pages-auth-routing.component';
import { HomeSystemComponent } from './home-system/home-system.component';
import { UserRoutingComponent } from './user/user-routing/user-routing.component';
import { UserModule } from './user/user.module';
import { PagesGuard } from '../guard/pages.guard';
import { ClientModule } from './client/client.module';


export const routesPagesAuth: Routes = [{
    path: '',
    component: PagesAuthRoutingComponent,
    children: [
        { path:'', redirectTo: 'home', pathMatch:'full' },
        { path:'home', component: HomeSystemComponent },
        { path:'user', canActivate:[PagesGuard], loadChildren: () => UserModule },
        { path:'client', canActivate:[PagesGuard], loadChildren: () => ClientModule }
    ]
}]