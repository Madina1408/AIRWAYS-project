import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFlightPageComponent } from './pages/booking-pages/select-flight-page/select-flight-page.component';
import { PassengersPageComponent } from './pages/booking-pages/passengers-page/passengers-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SummaryPageComponent } from './pages/booking-pages/summary-page/summary-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { EditFlightSearchComponent } from './components/edit-flight-search/edit-flight-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent, },
  { path: 'booking', redirectTo: '/booking/step1', pathMatch: 'full' },
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
    EditFlightSearchComponent,
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
