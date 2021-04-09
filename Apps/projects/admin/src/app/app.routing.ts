import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { ModuleWithProviders } from '@angular/core';
import { NoAuthPagesModule } from './no-auth-pages/no-auth-pages.module';

export const routes: Routes  = [
    { path:'', redirectTo:'auth', pathMatch:'full' },
    { path:'admin',loadChildren:() => PagesModule },
    { path:'auth',loadChildren:() => NoAuthPagesModule }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);