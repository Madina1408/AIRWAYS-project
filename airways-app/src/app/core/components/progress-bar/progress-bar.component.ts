import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }]
})
export class ProgressBarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  selectedIndex = 0;

  currentPageUrl = '';

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService) {}

  ngAfterViewInit() {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this.updateStepFromRoute();
          });
        }
      })
    );
    setTimeout(() => {
      this.updateStepFromRoute();
    });
  }

  private updateStepFromRoute(): void {
    const { url } = this.router;

    if (url.includes('step1')) {
      this.goToFlightSearchStep();
    } else if (url.includes('step2')) {
      this.goToPassengersStep();
    } else if (url.includes('step3')) {
      this.goToSummaryStep();
    }
  }

  private goToFlightSearchStep(): void {
    this.stepper.selectedIndex = 0;

    const step1Status = this.sessionStorageService.getStepCompletionStatus(1);
    const step2Status = this.sessionStorageService.getStepCompletionStatus(2);

    if (step1Status) {
      this.stepper.steps.toArray()[1].completed = JSON.parse(step1Status);
    }
    if (step2Status) {
      this.stepper.steps.toArray()[2].completed = JSON.parse(step2Status);
    }

  }

  private goToPassengersStep(): void {
    this.stepper.selectedIndex = 1;

    this.sessionStorageService.setStepCompletionStatus(1, true);

    const step2Status = this.sessionStorageService.getStepCompletionStatus(2);

    if (step2Status) {
      this.stepper.steps.toArray()[2].completed = JSON.parse(step2Status);
    }
  }

  private goToSummaryStep(): void {
    this.stepper.selectedIndex = 2;

    this.sessionStorageService.setStepCompletionStatus(2, true);

    const step1Status = this.sessionStorageService.getStepCompletionStatus(1);

    if (step1Status) {
      this.stepper.steps.toArray()[1].completed = JSON.parse(step1Status);
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
