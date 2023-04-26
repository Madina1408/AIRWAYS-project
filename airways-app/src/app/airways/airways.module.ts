import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFlightPageComponent } from './pages/booking-pages/select-flight-page/select-flight-page.component';
import { PassengersPageComponent } from './pages/booking-pages/passengers-page/passengers-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SummaryPageComponent } from './pages/booking-pages/summary-page/summary-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'main', component: MainPageComponent, },
  { path: 'booking/step1', component: SelectFlightPageComponent, },
  { path: 'booking/step2', component: PassengersPageComponent, },
  { path: 'booking/step3', component: SummaryPageComponent, },
  { path: 'shopping-cart', component: ShoppingCartPageComponent, },
];

@NgModule({
  declarations: [
    SelectFlightPageComponent,
    PassengersPageComponent,
    MainPageComponent,
    SummaryPageComponent,
    ShoppingCartPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    SelectFlightPageComponent,
    PassengersPageComponent,
    MainPageComponent,
    SummaryPageComponent,
    ShoppingCartPageComponent,
  ],
})
export class AirwaysModule { }
