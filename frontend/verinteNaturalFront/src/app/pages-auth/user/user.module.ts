import { NgModule } from "@angular/core";
import { UserControlComponent } from './user-control/user-control.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserRoutingComponent } from './user-routing/user-routing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesUser } from './user.routing';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        UserControlComponent,
        UserEditComponent,
        UserNewComponent,
        UserRoutingComponent
    ],
    imports:[
        NgbModule,
        CommonModule,
        RouterModule.forChild(routesUser),
        ReactiveFormsModule,
    ]
})
export class UserModule { }