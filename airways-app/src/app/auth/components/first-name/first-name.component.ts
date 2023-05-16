import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToolTips } from 'src/app/shared/models/enums/tool-tips';


@Component({
  selector: 'app-first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['./first-name.component.scss']
})
export class FirstNameComponent implements OnInit, OnDestroy {
  toolTips = ToolTips;

  subscriptions: Subscription[] = [];

  firstNameControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Za-z\s']+$/),
  ]);

  @Output() firstNameValueChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.subscriptions.push(
      this.firstNameControl.valueChanges.subscribe(value => {
        if (this.firstNameControl.valid) {
          this.firstNameValueChange.emit(value!);
        }
      })
    )
  };

  getFirstNameErrorMessage(): string {
    const firstNameValue = this.firstNameControl?.value!;

    if (this.firstNameControl?.hasError('required')) {
      return 'Please enter your first name';
    }
    if (!/^[A-Za-z\s']+$/.test(firstNameValue)) {
      return 'Invalid character';
    }
    return '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
