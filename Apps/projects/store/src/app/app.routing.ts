import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProfileComponent } from 'views/profile/profile.component';
import { HomeComponent } from 'views/home/home.component';

//Views

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent }
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {

});