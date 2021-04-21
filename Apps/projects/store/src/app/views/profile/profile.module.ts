import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from 'views/profile/profile.routing';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule
    ]
})
export class ProfileModule { }