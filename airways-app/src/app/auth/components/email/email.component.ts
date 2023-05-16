import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SubscriptSizing } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {

  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  subscriptions: Subscription[] = [];

  @Output() emailValueChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.subscriptions.push(
      this.emailControl.valueChanges.subscribe(value => {
        if (this.emailControl.valid) {
          this.emailValueChange.emit(value!);
        }
      })
    )
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
