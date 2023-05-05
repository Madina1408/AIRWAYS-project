import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';

@Component({
  selector: 'app-date-one',
  templateUrl: './date-one.component.html',
  styleUrls: ['./date-one.component.scss']
})
export class DateOneComponent implements OnInit, OnDestroy {
  minDate = new Date();

  selectedValueDateFormat = '';

  selectedDateValue!: Date | null;

  selectDateOne = new FormControl(this.selectedDateValue, Validators.required);

  subscriptions: Subscription[] = [];

  constructor(
    private headerService: HeaderService,
    private flightSearch: FlightSearchDataService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.headerService.selectedValueDateFormat$$.asObservable().subscribe(value => {
        this.selectedValueDateFormat = value.label;
          if (this.selectDateOne.valid) {
            this.formatAndSetValue();
          }
      }),
      this.flightSearch.selectedValueDateFrom$$.asObservable()
        .subscribe(value => {
          this.selectedDateValue = value;
        }),
      this.selectDateOne.valueChanges
        .subscribe(value => this.flightSearch.setSelectedValueDateFrom(value!)),
    );
    this.selectDateOne.setValue(this.selectedDateValue);
  }

  onDateChange() {
    this.selectedDateValue = this.selectDateOne.value;
    this.formatAndSetValue();
  }

  private formatAndSetValue() {
    console.log(this.selectedDateValue);
    const date = moment(this.selectedDateValue).format(this.selectedValueDateFormat);
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    inputElement.value = date;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
