import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ErrorComponent } from './no-auth/error/error.component';
import { NoAuthModule } from './no-auth/no-auth.module';
import { PagesAuthModule } from './pages-auth/pages-auth.module';
import { AuthGuard } from './guard/auth.guard';
import { PagesClientModule } from './pages-client/pages-client.module';

export const routes: Routes = [
    { path:'', redirectTo:'auth',pathMatch:'full' },
    { path:'auth',loadChildren: () => NoAuthModule },
    { path:'system', canActivate: [AuthGuard] , loadChildren: () => PagesAuthModule },
    { path:'store', canActivate: [AuthGuard], loadChildren: () => PagesClientModule },
    { path:'**', component: ErrorComponent}
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes,{

});