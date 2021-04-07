import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { routesProfile } from './profile.routing';
import { ProfileRoutingComponent } from './profile-routing/profile-routing.component';
import { ProfileControlComponent } from './profile-control/profile-control.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
    declarations:[
        ProfileRoutingComponent,
        ProfileControlComponent,
        ProfileEditComponent,
        PasswordComponent
    ],
    imports:[
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forChild(routesProfile)
    ]
})

export class ProfileModule {}