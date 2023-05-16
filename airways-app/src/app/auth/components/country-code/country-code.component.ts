import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import countryCodes from 'src/app/shared/models/constants/country-code';
import { ICountryCode } from 'src/app/shared/models/interfaces/country-code';

@Component({
  selector: 'app-country-code',
  templateUrl: './country-code.component.html',
  styleUrls: ['./country-code.component.scss'],
})
export class CountryCodeComponent implements OnInit, OnDestroy {
  countryCodes: ICountryCode [] = countryCodes;

  selectedCountryCode: ICountryCode | null = null;

  subscriptions: Subscription[] = [];

  countryCodeControl = new FormControl(this.selectedCountryCode, Validators.required);

  @Output() countryCodeValueChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.subscriptions.push(
      this.countryCodeControl.valueChanges.subscribe(value => {
        if (this.countryCodeControl.valid) {
          this.countryCodeValueChange.emit(value?.countryCode);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}
