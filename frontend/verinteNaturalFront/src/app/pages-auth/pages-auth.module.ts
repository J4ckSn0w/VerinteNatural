import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { PagesAuthRoutingComponent } from './pages-auth-routing/pages-auth-routing.component';
import { HomeSystemComponent } from './home-system/home-system.component';
import { routesPagesAuth } from './pages-auth.routing';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
    declarations: [
        HomeSystemComponent,
        NavbarComponent,
        FooterComponent,
        PagesAuthRoutingComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule.forChild(routesPagesAuth),
        ReactiveFormsModule
    ] 
})

export class PagesAuthModule {}