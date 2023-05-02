import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-date-round',
  templateUrl: './date-round.component.html',
  styleUrls: ['./date-round.component.scss']
})
export class DateRoundComponent {
  selectDateRound = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  minDate = new Date();

  selectedValueDateFormat = '';

  selectedDateValue!: { start: string, end: string };

  subscriptions: Subscription[] = [];

  @Output() dateRoundValueChange = new EventEmitter<{ start: string, end: string }>();

  constructor(
    private headerService: HeaderService,
    private elementRef: ElementRef
    ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.headerService.selectedValueDateFormat$$.subscribe(value => {
        this.selectedValueDateFormat = value;
        if (this.selectDateRound.valid) {
          const start = moment(new Date(this.selectedDateValue?.start)).format(this.selectedValueDateFormat);
          const end = moment(new Date(this.selectedDateValue?.end)).format(this.selectedValueDateFormat);
          const inputElementStart = this.elementRef.nativeElement.querySelector('.date__start');
          const inputElementEnd = this.elementRef.nativeElement.querySelector('.date__end');
          inputElementStart.value = start;
          inputElementEnd.value = end;
          this.dateRoundValueChange.emit({ start: start, end: end });
        }
      }),
    )
  }

  onDatesChange(start: string, end: string) {
    this.selectedDateValue = { start: start, end: end };
    this.dateRoundValueChange.emit({start: start, end: end});
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
