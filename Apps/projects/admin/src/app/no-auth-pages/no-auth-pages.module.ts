import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoAuthRoutingComponent } from './no-auth-routing/no-auth-routing.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { noAuthRoutes } from './no-auth-pages.routing';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[LoginComponent, RegisterComponent, NoAuthRoutingComponent],
    imports:[
        CommonModule,
        NgbModule,
        RouterModule.forChild(noAuthRoutes),
        ReactiveFormsModule
    ]
})

export class NoAuthPagesModule {}