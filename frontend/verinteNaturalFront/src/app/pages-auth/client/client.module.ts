import { NgModule } from "@angular/core";
import { ClientRoutingComponent } from './client-routing/client-routing.component';
import { ClientControlComponent } from './client-control/client-control.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { routesClient } from './client.routing';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

@NgModule({
    declarations: [
        ClientRoutingComponent,
        ClientControlComponent,
        ClientNewComponent,
        ClientEditComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routesClient)
    ]
})

export class ClientModule {}