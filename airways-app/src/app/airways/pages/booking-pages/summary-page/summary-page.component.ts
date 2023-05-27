import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/airways/services/shared/shared.service';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';
import passengersList from '../../../../shared/models/constants/passengers';
import { Router } from '@angular/router';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { UserService } from 'src/app/auth/services/user/user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { StepperService } from 'src/app/core/services/stepper/stepper.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  forwardData!: IGotFlightData;
  backwardData!: IGotFlightData;
  passengers: string[] = [];
  adultNumber: number = 0;
  adultStatus: boolean = false;
  adultTotalFare: number = 0;
  adultTotalTax: number = 0;
  childNumber: number = 0;
  childStatus: boolean = false;
  childTotalFare: number = 0;
  childTotalTax: number = 0;
  infantNumber: number = 0;
  infantStatus: boolean = false;
  infantTotalFare: number = 5.0;
  infantTotalTax: number = 0;
  TOTAL: number = 0;
  userId: string = '';
  currencySign?: string;
  currencyLabel: string = '';
  forwardFlightPrice: number = 0;
  backwardFlightPrice: number = 0;
  localStorageData: any[] = [];

  constructor(
    private sharedService: SharedService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private stepperService: StepperService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.userId = this.userService.getCurrentUserId();
    this.sharedService.selectedForwardFlight.asObservable().subscribe((res) => {
      this.forwardData = res;
    });
    this.sharedService.selectedBackwardFlight
      .asObservable()
      .subscribe((res) => {
        this.backwardData = res;
      });
    this.activatedRoute.queryParams.subscribe((res) => {
      this.passengers = res['passengers'].split(',');
      // console.log(this.passengers);
      for (let i = 0; i < this.passengers.length; i++) {
        if (this.passengers[i].includes('Adult')) {
          this.adultNumber = +this.passengers[i].charAt(0);
          this.adultStatus = true;
          if (this.backwardData.flightNumber !== undefined) {
            this.adultTotalTax =
              passengersList[0].taxBase * 2 * this.adultNumber;
          } else {
            this.adultTotalTax = passengersList[0].taxBase * this.adultNumber;
          }
        }
        if (this.passengers[i].includes('Child')) {
          this.childNumber = +this.passengers[i].charAt(1);
          this.childStatus = true;
          if (this.backwardData.flightNumber !== undefined) {
            this.childTotalTax =
              passengersList[1].taxBase * 2 * this.childNumber;
          } else {
            this.childTotalTax = passengersList[1].taxBase * this.childNumber;
          }
        }
        if (this.passengers[i].includes('Infant')) {
          this.infantNumber = +this.passengers[i].charAt(1);
          this.infantStatus = true;
          if (this.backwardData.flightNumber !== undefined) {
            this.infantTotalTax =
              passengersList[2].taxBase * 2 * this.infantNumber;
          } else {
            this.infantTotalTax = passengersList[2].taxBase * this.infantNumber;
          }
        }
      }
    });

    this.headerService.selectedValueCurrencyFormat$$.subscribe((res) => {
      this.currencySign = res.sign;
      this.currencyLabel = res.label;
    });

    switch (this.currencyLabel) {
      case 'USD':
        this.forwardFlightPrice = this.forwardData.price.usd;
        if (this.backwardData) {
          this.backwardFlightPrice = this.backwardData.price.usd;
        }
        break;
      case 'EUR':
        this.forwardFlightPrice = this.forwardData.price.eur;
        if (this.backwardData) {
          this.backwardFlightPrice = this.backwardData.price.eur;
        }
        break;
      case 'RUB':
        this.forwardFlightPrice = this.forwardData.price.rub;
        if (this.backwardData) {
          this.backwardFlightPrice = this.backwardData.price.rub;
        }
        break;
      case 'PLN':
        this.forwardFlightPrice = this.forwardData.price.pln;
        if (this.backwardData) {
          this.backwardFlightPrice = this.backwardData.price.pln;
        }
        break;
      default: {
        break;
      }
    }

    if (this.backwardData) {
      this.adultTotalFare =
        (this.forwardFlightPrice + this.backwardFlightPrice) * this.adultNumber;
    } else {
      this.adultTotalFare = this.forwardFlightPrice * this.adultNumber;
    }
    if (this.backwardData) {
      this.childTotalFare = +(
        (this.forwardFlightPrice + this.backwardFlightPrice) *
        0.5 *
        this.childNumber
      ).toFixed(2);
    } else {
      this.childTotalFare = +(
        this.forwardFlightPrice *
        0.5 *
        this.childNumber
      ).toFixed(2);
    }
    if (this.backwardData) {
      this.infantTotalFare = +(
        (this.forwardFlightPrice + this.backwardFlightPrice) *
        0.2 *
        this.infantNumber
      ).toFixed(2);
    } else {
      this.infantTotalTax = +(
        this.forwardFlightPrice *
        0.2 *
        this.infantNumber
      ).toFixed(2);
    }
    this.TOTAL = +(
      this.adultTotalFare +this.adultTotalTax+
      this.childTotalFare +this.childTotalTax+
      this.infantTotalFare+this.infantTotalTax
    ).toFixed(2);
  }

  goBack() {
    this.location.back();
    this.stepperService.previousStep();
  }

  addToCart() {
    const existingCart = this.localStorageService.getTypedStorageItem(
      this.userId
    );
    this.localStorageData.push([this.passengers, this.TOTAL,this.forwardData, this.backwardData ]);
    if (existingCart === null) {
      this.localStorageService.setTypedStorageItem(
        this.userId,
        this.localStorageData
      );
    } else {
      existingCart.push([this.passengers,this.TOTAL,this.forwardData, this.backwardData ]);
      this.localStorageService.setTypedStorageItem(this.userId, existingCart);
      this.sharedService.getAddToCardNumber(existingCart.length)
    }

    this.router.navigateByUrl(RoutesPaths.MainPage);
  }

  goToUserAccount() {
    this.router.navigateByUrl(RoutesPaths.UserAccountPage);
  }

  proceedToPayment() {
    const existingCart = this.localStorageService.getTypedStorageItem(
      this.userId
    );
    this.localStorageData.push([this.passengers, this.TOTAL,this.forwardData, this.backwardData ]);
    if (existingCart === null) {
      this.localStorageService.setTypedStorageItem(
        this.userId,
        this.localStorageData
      );
    } else {
      existingCart.push([this.passengers,this.TOTAL,this.forwardData, this.backwardData ]);
      this.localStorageService.setTypedStorageItem(this.userId, existingCart);
      this.sharedService.getAddToCardNumber(existingCart.length)
    }
    this.router.navigateByUrl(RoutesPaths.ShoppingCart);
  }
}
