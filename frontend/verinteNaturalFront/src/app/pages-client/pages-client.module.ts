import { NgModule } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { PagesClientRoutingComponent } from './pages-client-routing/pages-client-routing.component';
import { RouterModule } from '@angular/router';
import { routesPagesClient } from './pages-client.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
    declarations: [
        HomeComponent,
        PagesClientRoutingComponent,
        FooterComponent,
        NavbarComponent
    ],
    imports: [
        RouterModule.forChild(routesPagesClient),
        NgbModule,
        CommonModule,
        ReactiveFormsModule
    ]
})

export class PagesClientModule {}