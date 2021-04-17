import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Tools
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
import { PortfolioComponent } from './components/home/portfolio/portfolio.component';
import { UserDataComponent } from './components/profile/user-data/user-data.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { AddressesComponent } from './components/profile/addresses/addresses.component';
import { MyOrdersComponent } from './components/profile/my-orders/my-orders.component';
import { MyPendingsOrdersComponent } from './components/profile/my-pendings-orders/my-pendings-orders.component';


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
    CarouselComponent,
    PortfolioComponent,
    UserDataComponent,
    ChangePasswordComponent,
    AddressesComponent,
    MyOrdersComponent,
    MyPendingsOrdersComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
