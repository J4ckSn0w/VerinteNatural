import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes  = [
    { path:'', redirectTo:'admin', pathMatch:'full' },
    { path:'admin',loadChildren:() => PagesModule }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);