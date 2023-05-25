import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Input() initialValue!: string;
  @Output() dateBirthValueChange = new EventEmitter<Date | null>();

  maxDate = new Date();

  selectedValueDateFormat = '';

  selectedDateBirthValue!: Date | null;

  dateBirthControl!: FormControl;

  subscriptions: Subscription[] = [];

  constructor (
    private headerService: HeaderService,
    private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.dateBirthControl = new FormControl(new Date(this.initialValue) || null, [
      Validators.required,
    ]);
    this.subscriptions.push(
      this.headerService.selectedValueDateFormat$$.subscribe(value => {
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
