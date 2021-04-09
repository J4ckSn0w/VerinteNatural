import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './no-auth/login/login.component';
import { RegisterComponent } from './no-auth/register/register.component';
import { ErrorComponent } from './no-auth/error/error.component';
import { routing } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    /*NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent*/
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    routing,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    RouterModule,
    CommonModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
