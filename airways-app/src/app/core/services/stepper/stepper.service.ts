import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private stepper!: any;

  setStepper(stepper: any) {
    this.stepper = stepper;
  }

  nextStep() {
    this.stepper.next();
  }

  previousStep() {
    this.stepper.previous();
  }
}
