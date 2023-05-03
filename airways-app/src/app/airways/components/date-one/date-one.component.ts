import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-date-one',
  templateUrl: './date-one.component.html',
  styleUrls: ['./date-one.component.scss']
})
export class DateOneComponent implements OnInit, OnDestroy {
  selectDateOne = new FormControl('', Validators.required);

  minDate = new Date();

  selectedValueDateFormat = '';

  selectedDateValue = '';

  subscriptions: Subscription[] = [];

  @Output() dateOneWayValueChange = new EventEmitter<string>();

  constructor(
    private headerService: HeaderService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.headerService.selectedValueDateFormat$$.subscribe(value => {
        this.selectedValueDateFormat = value;
          if (this.selectDateOne.valid) {
            this.formatAndSetValue();
          }
      })
    )
  }

  onDateChange(value: string) {
    this.selectedDateValue = value;
    this.formatAndSetValue();
  }

  formatAndSetValue() {
    const date = moment(new Date(this.selectedDateValue)).format(this.selectedValueDateFormat);
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    inputElement.value = date;
    if (this.selectedValueDateFormat === 'YYYY/DD/MM') {
      const date = moment(new Date(this.selectedDateValue)).format('MM/DD/YYYY');
      this.dateOneWayValueChange.emit(date);
    } else {
      this.dateOneWayValueChange.emit(date);
    }
  }

  formatDate(date: Date, format: string): string {
   return moment(date).format(format.replace('MM', 'M').replace('DD', 'D').replace('YYYY', 'Y'));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
