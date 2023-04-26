import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { PainPageComponent } from './airways/pages/pain-page/pain-page.component';
import { SelectFlightPageComponent } from './airways/pages/booking-pages/select-flight-page/select-flight-page.component';
import { PassengersPageComponent } from './airways/pages/booking-pages/passengers-page/passengers-page.component';
import { MainPageComponent } from './airways/pages/main-page/main-page.component';
import { SummaryPageComponent } from './airways/pages/booking-pages/summary-page/summary-page.component';
import { ShoppingCartPageComponent } from './airways/pages/shopping-cart-page/shopping-cart-page.component';
import { TabComponent } from './auth/components/tab/tab.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PainPageComponent,
    SelectFlightPageComponent,
    PassengersPageComponent,
    MainPageComponent,
    SummaryPageComponent,
    ShoppingCartPageComponent,
    TabComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
