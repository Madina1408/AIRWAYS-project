import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import dateFormatMenu from '../../shared/models/constants/date-format';
import currencyFormatMenu from '../../shared/models/constants/currency-format';
import { IFormat } from 'src/app/shared/models/interfaces/format-interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  dateFormats = dateFormatMenu;
  selectedValueDateFormat$$ = new BehaviorSubject<IFormat>(this.dateFormats[0]);

  currancyFormats = currencyFormatMenu;
  selectedValueCurrencyFormat$$ = new BehaviorSubject<IFormat>(this.currancyFormats[0]);

  setSelectedValueDateFormat(value: IFormat) {
    this.selectedValueDateFormat$$.next(value);
  }

  setSelectedValueCurrencyFormat(value: IFormat) {
    this.selectedValueCurrencyFormat$$.next(value);
  }
}
