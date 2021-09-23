import { NgModule } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { PagesClientRoutingComponent } from './pages-client-routing/pages-client-routing.component';
import { RouterModule } from '@angular/router';
import { routesPagesClient } from './pages-client.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SessionModalComponent } from './../no-auth/session-modal/session-modal/session-modal.component'
import { LoginComponent } from './../no-auth/session-modal/login/login.component'
import { ForgotPasswordComponent } from './../no-auth/session-modal/forgot-password/forgot-password.component'
import { RegisterComponent } from './../no-auth/session-modal/register/register.component'

@NgModule({
    declarations: [
        HomeComponent,
        PagesClientRoutingComponent,
        FooterComponent,
        NavbarComponent,
        SessionModalComponent,
        LoginComponent,
        ForgotPasswordComponent,
        RegisterComponent
    ],
    imports: [
        RouterModule.forChild(routesPagesClient),
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})

export class PagesClientModule { }