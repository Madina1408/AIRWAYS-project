import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SubscriptSizing } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {
  @Input() initialValue!: string;
  @Output() emailValueChange = new EventEmitter<string>();

  emailControl!: FormControl;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.emailControl = new FormControl(this.initialValue || '', [
      Validators.required,
      Validators.email
    ]);
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
