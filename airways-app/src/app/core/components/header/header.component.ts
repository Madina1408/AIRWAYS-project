import { Component } from '@angular/core';
import { ISelectFormat } from '../../data/interfaces/select-format-interface';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import currencyFormatMenu from '../../data/constants/currency-format';
import dateFormatMenu from '../../data/constants/date-format';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HeaderComponent {
  dateOptions: ISelectFormat[] = dateFormatMenu;
  selectedDateFormat: string = dateFormatMenu[0].label;

  currencyOptions: ISelectFormat[] = currencyFormatMenu;
  selectedCurrencyFormat: string = currencyFormatMenu[0].label;

  isShowBookFlights = false;
  isShowProgressBar = false;

  subscriptions: Subscription[] = [];

  constructor(private router: Router) {}


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
}
