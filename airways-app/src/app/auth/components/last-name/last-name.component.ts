import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToolTips } from 'src/app/shared/models/enums/tool-tips';

@Component({
  selector: 'app-last-name',
  templateUrl: './last-name.component.html',
  styleUrls: ['./last-name.component.scss']
})
export class LastNameComponent implements OnInit, OnDestroy {
  toolTips = ToolTips;

  subscriptions: Subscription[] = [];

  lastNameControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Za-z\s']+$/),
  ]);

  @Output() lastNameValueChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.subscriptions.push(
      this.lastNameControl.valueChanges.subscribe(value => {
        if (this.lastNameControl.valid) {
          this.lastNameValueChange.emit(value!);
        }
      })
    )
  };

  getLastNameErrorMessage(): string {
    const lastNameValue = this.lastNameControl?.value!;

    if (this.lastNameControl?.hasError('required')) {
      return 'Please enter your last name';
    }
    if (!/^[A-Za-z\s']+$/.test(lastNameValue)) {
      return 'Invalid character';
    }
    return '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
