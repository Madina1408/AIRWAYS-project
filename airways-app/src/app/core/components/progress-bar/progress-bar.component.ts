import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { StepperService } from '../../services/stepper/stepper.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }]
})
export class ProgressBarComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;

  selectedIndex = 0;

  currentPageUrl = '';

  constructor(private stepperService: StepperService, private router: Router) {}

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.currentPageUrl = event.url;
    //     const routePath = event.url.split('?')[0];
    //     console.log(routePath);

    //     switch (routePath) {
    //       case RoutesPaths.BookingPageStep1:
    //         this.selectedIndex = 0;
    //         break;
    //       case RoutesPaths.BookingPageStep2:
    //         this.selectedIndex = 1;
    //         break;
    //       case RoutesPaths.BookingPageStep3:
    //         this.selectedIndex = 2;
    //         break;
    //       default:
    //         this.selectedIndex = 0;
    //     }
    //   }
    // });
  }

  ngAfterViewInit() {
    this.stepperService.setStepper(this.stepper);
  }
}
