import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Tools
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

//Views
import { AppComponent } from './app.component';
import { ProfileComponent } from 'views/profile/profile.component';
import { HomeComponent } from 'views/home/home.component'

// Shared
import { HeaderComponent } from 'components/shared/header/header.component';
import { FooterComponent } from 'components/shared/footer/footer.component';

// Components
import { SessionModalComponent } from 'components/modals/session-modal/session-modal/session-modal.component'
import { LoginComponent } from 'components/modals/session-modal/login/login.component'
import { ForgotPasswordComponent } from 'components/modals/session-modal/forgot-password/forgot-password.component'
import { RegisterComponent } from 'components/modals/session-modal/register/register.component';
import { CarouselComponent } from 'components/home/carousel/carousel.component';


@NgModule({
  declarations: [
    //Views
    AppComponent,
    ProfileComponent,
    HomeComponent,

    //Shared
    HeaderComponent,
    FooterComponent,

    // Components
    SessionModalComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    CarouselComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
