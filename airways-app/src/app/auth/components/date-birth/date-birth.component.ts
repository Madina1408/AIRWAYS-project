import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-date-birth',
  templateUrl: './date-birth.component.html',
  styleUrls: ['./date-birth.component.scss']
})
export class DateBirthComponent implements OnInit, OnDestroy {
  maxDate = new Date();

  selectedValueDateFormat = '';

  selectedDateBirthValue!: Date | null;

  dateBirthControl = new FormControl(null, [
    Validators.required,
  ]);

  subscriptions: Subscription[] = [];

  @Output() dateBirthValueChange = new EventEmitter<Date | null>();

  constructor (
    private headerService: HeaderService,
    private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.headerService.selectedValueDateFormat$$.asObservable().subscribe(value => {
        this.selectedValueDateFormat = value.label;
          if (this.dateBirthControl.valid) {
            this.formatAndSetValue();
          }
      }),
      this.dateBirthControl.valueChanges
        .subscribe(value => {
          if (this.dateBirthControl.valid) {
            this.selectedDateBirthValue = value;
            this.dateBirthValueChange.emit(this.selectedDateBirthValue);
          }
        }),
    );
  }

  private formatAndSetValue(): void {
    const date = moment(this.selectedDateBirthValue).format(this.selectedValueDateFormat);
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    inputElement.value = date;
  }

  onDateChange(): void {
    this.selectedDateBirthValue = this.dateBirthControl.value;
    this.formatAndSetValue();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
