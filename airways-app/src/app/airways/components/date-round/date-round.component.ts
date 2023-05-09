import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';

@Component({
  selector: 'app-date-round',
  templateUrl: './date-round.component.html',
  styleUrls: ['./date-round.component.scss']
})
export class DateRoundComponent {
  minDate = new Date();

  selectedValueDateFormat = '';

  selectedDateValue: { start: Date | null, end: Date | null} = { start: null, end: null };

  subscriptions: Subscription[] = [];

  @Output() dateRoundValueChange = new EventEmitter<{ start: Date | null, end: Date | null}>();

  selectDateRound = new FormGroup({
    start: new FormControl(this.selectedDateValue.start, Validators.required),
    end: new FormControl(this.selectedDateValue.end, Validators.required),
  });

  constructor(
    private headerService: HeaderService,
    private flightSearch: FlightSearchDataService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.headerService.selectedValueDateFormat$$.subscribe(value => {
        this.selectedValueDateFormat = value.label;
        if (this.selectDateRound.valid) {
          this.formatAndSetValue();
        }
      }),
      this.flightSearch.selectedValueDateFrom$$.asObservable()
      .subscribe(value => {
        this.selectedDateValue.start = value;
      }),
      this.flightSearch.selectedValueDateReturn$$.asObservable()
      .subscribe(value => {
        this.selectedDateValue.end = value;
      }),
    this.selectDateRound.valueChanges
      .subscribe(value => {
        this.flightSearch.setSelectedValueDateFrom(value.start!);
        this.flightSearch.setSelectedValueDateReturn(value.end!);
      }),
    );
    this.selectDateRound.setValue(this.selectedDateValue);
    this.dateRoundValueChange.emit(this.selectedDateValue);
  }

  onDatesChange() {
    const startValue = this.selectDateRound.get('start')?.value;
    const endValue = this.selectDateRound.get('end')?.value;
    this.selectedDateValue = { start: startValue!, end: endValue!};
    this.formatAndSetValue();
    this.dateRoundValueChange.emit(this.selectedDateValue);
  }

  private formatAndSetValue() {
    const start = this.formatDate(this.selectedDateValue.start!, this.selectedValueDateFormat);
    const end = this.formatDate(this.selectedDateValue.end!, this.selectedValueDateFormat);

    const inputElementStart = this.elementRef.nativeElement.querySelector('.date__start');
    const inputElementEnd = this.elementRef.nativeElement.querySelector('.date__end');

    inputElementStart.value = start;
    inputElementEnd.value = end;
  }

  private formatDate(date: Date, format: string): string {
    return moment(date).format(format.replace('MM', 'M').replace('DD', 'D').replace('YYYY', 'Y'));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
