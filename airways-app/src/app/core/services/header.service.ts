import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import dateFormatMenu from '../data/constants/date-format';
import currencyFormatMenu from '../data/constants/currency-format';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  dateFormats = dateFormatMenu;
  selectedValueDateFormat$$ = new BehaviorSubject<string>(this.dateFormats[0].label);

  currancyFormats = currencyFormatMenu;
  selectedValueCurrencyFormat$$ = new BehaviorSubject<string>(this.currancyFormats[0].label);

  setSelectedValueDateFormat(value: string) {
    this.selectedValueDateFormat$$.next(value);
  }

  setSelectedValueCurrencyFormat(value: string) {
    this.selectedValueCurrencyFormat$$.next(value);
  }
}
