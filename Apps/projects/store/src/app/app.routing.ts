import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from 'views/home/home.component';
//Views

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule) }
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {

});