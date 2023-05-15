import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Gender } from 'src/app/shared/models/enums/gender';


@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit, OnDestroy {
  gender = Gender;

  selectedGenderValue = 'Male';

  subscriptions: Subscription[] = [];

  genderControl = new FormControl('');

  @Output() genderValueChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.subscriptions.push(
      this.genderControl.valueChanges.subscribe(value => {
        if (this.genderControl.valid) {
          this.genderValueChange.emit(value!);
        }
      })
    )
  };

  onSelectGender(value: string): void {
    this.selectedGenderValue = value;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
