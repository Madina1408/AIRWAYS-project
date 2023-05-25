import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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

  selectedDateValue: Date | null = null;;

  dateOneControl = new FormControl(this.selectedDateValue, Validators.required);

  subscriptions: Subscription[] = [];

  @Output() dateOneWayValueChange = new EventEmitter<Date | null>();

  constructor(
    private headerService: HeaderService,
    private flightSearch: FlightSearchDataService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.headerService.selectedValueDateFormat$$.subscribe(value => {
        this.selectedValueDateFormat = value.label;
          if (this.dateOneControl.valid) {
            this.formatAndSetValue();
          }
      }),
      this.flightSearch.selectedValueDateFrom$$
        .subscribe(value => {
          this.selectedDateValue = value;
        }),
      this.dateOneControl.valueChanges
        .subscribe(value => {
          if (this.dateOneControl.valid) {
            this.flightSearch.setSelectedValueDateFrom(value);
            this.dateOneWayValueChange.emit(value);
          }
        }),
    );
    this.dateOneControl.setValue(this.selectedDateValue);
  }

  onDateChange(): void {
    this.selectedDateValue = this.dateOneControl.value;
    this.formatAndSetValue();
  }

  private formatAndSetValue(): void {
    const date = moment(this.selectedDateValue).format(this.selectedValueDateFormat);
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    inputElement.value = date;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
