import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  phoneNumberControl = new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]);

  @Output() phoneNumberValueChange = new EventEmitter<string>();

  ngOnInit(): void {
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
