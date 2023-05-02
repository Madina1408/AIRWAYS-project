import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-date-one',
  templateUrl: './date-one.component.html',
  styleUrls: ['./date-one.component.scss']
})
export class DateOneComponent implements OnInit, OnDestroy {
  selectDateOne = new FormControl('', [Validators.required]);

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
        const date = moment(new Date(this.selectedDateValue)).format(this.selectedValueDateFormat);
        const inputElement = this.elementRef.nativeElement.querySelector('input');
        inputElement.value = date;
        this.dateOneWayValueChange.emit(date);
      })
    )
  }

  onDateChange(value: string) {
    this.selectedDateValue = value;
    this.dateOneWayValueChange.emit(value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
