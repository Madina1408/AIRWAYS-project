import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import dateFormatMenu from '../data/constants/date-format';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  selectedValueDateFormat$$ = new BehaviorSubject<string>(dateFormatMenu[0].label);

  sekectedValueCurrencyFormat$$ = new BehaviorSubject<string>('');

  setSelectedValueDateFormat(value: string) {
    this.selectedValueDateFormat$$.next(value);
  }

  setSelectedValueCurrencyFormat(value: string) {
    this.sekectedValueCurrencyFormat$$.next(value);
  }
}
