import { Routes } from '@angular/router';
import { PagesAuthRoutingComponent } from './pages-auth-routing/pages-auth-routing.component';
import { HomeSystemComponent } from './home-system/home-system.component';


export const routesPagesAuth: Routes = [{
    path: '',
    component: PagesAuthRoutingComponent,
    children: [
        { path:'', redirectTo: 'home', pathMatch:'full' },
        { path:'home', component: HomeSystemComponent }
    ]
}]