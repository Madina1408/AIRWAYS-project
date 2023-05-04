import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import dateFormatMenu from '../data/constants/date-format';
import currencyFormatMenu from '../data/constants/currency-format';
import { ISelectFormat } from 'src/app/shared/models/interfaces/select-format-interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  dateFormats = dateFormatMenu;
  selectedValueDateFormat$$ = new BehaviorSubject<ISelectFormat>(this.dateFormats[0]);

  currancyFormats = currencyFormatMenu;
  selectedValueCurrencyFormat$$ = new BehaviorSubject<ISelectFormat>(this.currancyFormats[0]);

  setSelectedValueDateFormat(value: ISelectFormat) {
    this.selectedValueDateFormat$$.next(value);
  }

  setSelectedValueCurrencyFormat(value: ISelectFormat) {
    this.selectedValueCurrencyFormat$$.next(value);
  }
}
