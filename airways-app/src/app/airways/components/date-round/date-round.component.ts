import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
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
        this.selectedValueDateFormat = value.label;
        if (this.selectDateRound.valid) {
          this.formatAndSetValue();
        }
      }),
    )
  }

  onDatesChange(start: string, end: string) {
    this.selectedDateValue = { start: start, end: end };
    this.formatAndSetValue();
  }

  formatAndSetValue() {
    const start = this.formatDate(new Date(this.selectedDateValue?.start), this.selectedValueDateFormat);
    const end = this.formatDate(new Date(this.selectedDateValue?.end), (this.selectedValueDateFormat));

    const inputElementStart = this.elementRef.nativeElement.querySelector('.date__start');
    const inputElementEnd = this.elementRef.nativeElement.querySelector('.date__end');

    inputElementStart.value = start;
    inputElementEnd.value = end;
    if (this.selectedValueDateFormat === 'YYYY/DD/MM') {
      const start =this.formatDate(new Date(this.selectedDateValue?.start), 'YYYY/MM/DD');
      const end = this.formatDate(new Date(this.selectedDateValue?.end),'YYYY/MM/DD');
      this.dateRoundValueChange.emit({ start: start, end: end });
    } else {
      this.dateRoundValueChange.emit({ start: start, end: end });
    }
  }

  formatDate(date: Date, format: string): string {
    return moment(date).format(format.replace('MM', 'M').replace('DD', 'D').replace('YYYY', 'Y'));
   }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
