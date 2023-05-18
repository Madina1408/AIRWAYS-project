import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlightDataResolver } from './airways/flight-data.resolver';
import { AuthModule } from './auth/auth.module';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [FlightDataResolver, HttpClient, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
