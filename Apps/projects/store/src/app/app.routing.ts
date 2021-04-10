import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProfileComponent } from 'views/profile/profile.component';

//Views

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent }
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {

});