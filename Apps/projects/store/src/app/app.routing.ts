import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from 'views/home/home.component';
import { ProfileModule } from 'views/profile/profile.module';
//Views

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', loadChildren: () => ProfileModule }
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {

});