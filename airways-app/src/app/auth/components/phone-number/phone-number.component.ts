import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit, OnDestroy {
  @Input() initialValue!: string;
  @Output() phoneNumberValueChange = new EventEmitter<string>();

  subscriptions: Subscription[] = [];

  phoneNumberControl!: FormControl;

  ngOnInit(): void {
    this.phoneNumberControl = new FormControl(this.initialValue || '', [Validators.required, Validators.pattern(/^\d+$/)]);
    this.subscriptions.push(
      this.phoneNumberControl.valueChanges.subscribe(value => {
        if (this.phoneNumberControl.valid) {
          this.phoneNumberValueChange.emit(value!);
        }
      })
    )
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
