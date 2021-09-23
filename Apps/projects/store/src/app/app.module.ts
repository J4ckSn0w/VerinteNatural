import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'

//Tools
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgPopupsModule } from 'ng-popups';
import { ToastrModule } from 'ngx-toastr';

//Views
import { AppComponent } from './app.component';
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
import { PortfolioComponent } from 'components/home/portfolio/portfolio.component';
import { ProductsListComponent } from 'components/shared/products-list/products-list.component';
import { ProductComponent } from 'components/shared/product/product.component';
import { AddressesModalComponent } from 'components/modals/addresses-modal/addresses-modal.component';

@NgModule({
  declarations: [
    //Views
    AppComponent,
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
    ProductsListComponent,
    ProductComponent,
    AddressesModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgPopupsModule.forRoot({
      theme: 'material', // available themes: 'default' | 'material' | 'dark'
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      color: '#003f88',
      titles: {
        alert: 'Danger!',
        confirm: 'Confirmation',
        prompt: 'Website asks...'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
