import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gender } from 'src/app/shared/models/enums/gender';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';


@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() initialValue!: string;
  @Output() genderValueChange = new EventEmitter<string>();

  gender = Gender;

  selectedGenderValue = 'Male';

  subscriptions: Subscription[] = [];

  isPassengersPage = false;

  genderControl!: FormControl;

  constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.initialValue) {
      this.selectedGenderValue = this.initialValue;
    }
    this.genderControl = new FormControl(this.selectedGenderValue);
    this.genderValueChange.emit(this.selectedGenderValue);
    this.subscriptions.push(
      this.genderControl.valueChanges.subscribe(value => {
        if (this.genderControl.valid) {
          this.selectedGenderValue = value!;
          this.genderValueChange.emit(value!);
        }
      }),
    this.route.url.subscribe(url => {
      console.log(url[0].path);
      this.isPassengersPage = url[0].path === RoutesPaths.BookingPage;
    })
    );
  };

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
