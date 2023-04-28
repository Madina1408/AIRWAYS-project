import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISelectFormat } from '../../../shared/models/interfaces/select-format-interface';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import currencyFormatMenu from '../../data/constants/currency-format';
import dateFormatMenu from '../../data/constants/date-format';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutesPaths } from '../../data/enums/routes-paths';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateOptions: ISelectFormat[] = dateFormatMenu;
  selectedDateFormat: string = dateFormatMenu[0].label;

  currencyOptions: ISelectFormat[] = currencyFormatMenu;
  selectedCurrencyFormat: string = currencyFormatMenu[0].label;

  isShowBookFlights = false;
  isShowProgressBar = false;
  isMainPage = true;
  headerClass = '';

  subscriptions: Subscription[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.url;
          console.log(currentUrl);

          switch (currentUrl.split('/')[1]) {
            case RoutesPaths.MainPage:
              this.isShowBookFlights = true;
              this.isShowProgressBar = false;
              this.isMainPage = true;
              this.headerClass = RoutesPaths.MainPage;
              break;
            case RoutesPaths.BookingPage:
              this.isShowBookFlights = false;
              this.isShowProgressBar = true;
              this.isMainPage = false;
              this.headerClass = RoutesPaths.BookingPage;
              break;
            case RoutesPaths.ShoppingCart:
              this.isShowBookFlights = false;
              this.isShowProgressBar = true;
              this.isMainPage = false;
              this.headerClass = RoutesPaths.ShoppingCart;
              break;
            default:
            this.isShowBookFlights = true;
            this.isShowProgressBar = false;
            this.isMainPage = true;
            this.headerClass = RoutesPaths.MainPage;
          }
        }
      })
    );
  }

  onSelectDateFormat(option: ISelectFormat) {
    this.selectedDateFormat = option.label;
    option.selected = true;

    this.dateOptions.forEach((item) => {
      if (item !== option) {
        item.selected = false;
      }
    });
  }

  onSelectCurrencyFormat(option: ISelectFormat) {
    this.selectedCurrencyFormat = option.label;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
