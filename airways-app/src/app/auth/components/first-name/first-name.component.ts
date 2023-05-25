import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToolTips } from 'src/app/shared/models/enums/tool-tips';


@Component({
  selector: 'app-first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['./first-name.component.scss']
})
export class FirstNameComponent implements OnInit, OnDestroy {
  @Input() initialValue!: string;
  @Output() firstNameValueChange = new EventEmitter<string>();

  toolTips = ToolTips;

  subscriptions: Subscription[] = [];

  firstNameControl!: FormControl;

  ngOnInit(): void {
    this.firstNameControl = new FormControl(this.initialValue || '', [
      Validators.required,
      Validators.pattern(/^[A-Za-z\s']+$/),
    ]);
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
