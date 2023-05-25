import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Input() initialValue!: string;
  @Output() countryCodeNameValueChange = new EventEmitter<string>();
  @Output() countryCodeValueChange = new EventEmitter<string>();

  countryCodes: ICountryCode [] = countryCodes;

  subscriptions: Subscription[] = [];

  countryCodeControl!: FormControl;

  ngOnInit(): void {
    this.countryCodeControl = new FormControl(this.initialValue || '', Validators.required);
    this.subscriptions.push(
      this.countryCodeControl.valueChanges.subscribe(value => {
        if (this.countryCodeControl.valid) {
          this.countryCodeValueChange.emit(value?.name);
          this.countryCodeValueChange.emit(value?.countryCode);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}
