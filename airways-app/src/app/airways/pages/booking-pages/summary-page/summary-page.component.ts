import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/airways/services/shared/shared.service';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';
import passengersList from '../../../../shared/models/constants/passengers';
import { Router } from '@angular/router';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { HttpClient } from '@angular/common/http';
import { CartOrderService } from 'src/app/airways/services/cart-order/cart-order.service';
import { UserService } from 'src/app/auth/services/user/user.service';

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
  numberOfTickets: number = 0;
  localStorageData: any = [];
  items: any = {
    seats: {
      total: 541,
      avaible: 213,
    },
    flightNumber: 'ZG-8931',
    timeMins: 307,
    form: {
      key: 'AMS',
      name: 'Amsterdam-Schiphol',
      city: 'Amsterdam',
      gmt: '+1.0',
      country: 'Netherlands',
    },
    to: {
      key: 'BER',
      name: 'Berlin Metropolitan Area',
      city: 'Berlin',
      gmt: '+1.0',
      country: 'Germany',
    },
    takeoffDate: '2023-05-20T06:06:00.000Z',
    landingDate: '2023-05-20T11:08:00.000Z',
    price: {
      eur: 299,
      usd: 329.82689999999997,
      rub: 26452.53,
      pln: 1372.4099999999999,
    },
    otherFlights: {
      '2': {
        seats: {
          total: 143,
          avaible: 42,
        },
        flightNumber: 'TY-3901',
        timeMins: 303,
        form: {
          key: 'AMS',
          name: 'Amsterdam-Schiphol',
          city: 'Amsterdam',
          gmt: '+1.0',
          country: 'Netherlands',
        },
        to: {
          key: 'BER',
          name: 'Berlin Metropolitan Area',
          city: 'Berlin',
          gmt: '+1.0',
          country: 'Germany',
        },
        takeoffDate: '2023-05-22T18:36:00.000Z',
        landingDate: '2023-05-22T23:38:00.000Z',
        price: {
          eur: 312,
          usd: 344.1672,
          rub: 27602.64,
          pln: 1432.08,
        },
      },
      '3': {
        seats: {
          total: 220,
          avaible: 173,
        },
        flightNumber: 'DG-3875',
        timeMins: 297,
        form: {
          key: 'AMS',
          name: 'Amsterdam-Schiphol',
          city: 'Amsterdam',
          gmt: '+1.0',
          country: 'Netherlands',
        },
        to: {
          key: 'BER',
          name: 'Berlin Metropolitan Area',
          city: 'Berlin',
          gmt: '+1.0',
          country: 'Germany',
        },
        takeoffDate: '2023-05-23T01:08:00.000Z',
        landingDate: '2023-05-23T06:10:00.000Z',
        price: {
          eur: 294,
          usd: 324.3114,
          rub: 26010.18,
          pln: 1349.46,
        },
      },
      '4': {
        seats: {
          total: 192,
          avaible: 163,
        },
        flightNumber: 'AG-4103',
        timeMins: 297,
        form: {
          key: 'AMS',
          name: 'Amsterdam-Schiphol',
          city: 'Amsterdam',
          gmt: '+1.0',
          country: 'Netherlands',
        },
        to: {
          key: 'BER',
          name: 'Berlin Metropolitan Area',
          city: 'Berlin',
          gmt: '+1.0',
          country: 'Germany',
        },
        takeoffDate: '2023-05-24T07:51:00.000Z',
        landingDate: '2023-05-24T12:53:00.000Z',
        price: {
          eur: 287,
          usd: 316.5897,
          rub: 25390.89,
          pln: 1317.33,
        },
      },
      '5': {
        seats: {
          total: 415,
          avaible: 268,
        },
        flightNumber: 'SJ-9598',
        timeMins: 303,
        form: {
          key: 'AMS',
          name: 'Amsterdam-Schiphol',
          city: 'Amsterdam',
          gmt: '+1.0',
          country: 'Netherlands',
        },
        to: {
          key: 'BER',
          name: 'Berlin Metropolitan Area',
          city: 'Berlin',
          gmt: '+1.0',
          country: 'Germany',
        },
        takeoffDate: '2023-05-25T18:26:00.000Z',
        landingDate: '2023-05-25T23:28:00.000Z',
        price: {
          eur: 301,
          usd: 332.0331,
          rub: 26629.47,
          pln: 1381.59,
        },
      },
      '-1': {
        seats: {
          total: 528,
          avaible: 392,
        },
        flightNumber: 'XB-7314',
        timeMins: 300,
        form: {
          key: 'AMS',
          name: 'Amsterdam-Schiphol',
          city: 'Amsterdam',
          gmt: '+1.0',
          country: 'Netherlands',
        },
        to: {
          key: 'BER',
          name: 'Berlin Metropolitan Area',
          city: 'Berlin',
          gmt: '+1.0',
          country: 'Germany',
        },
        takeoffDate: '2023-05-19T23:06:00.000Z',
        landingDate: '2023-05-20T04:08:00.000Z',
        price: {
          eur: 315,
          usd: 347.4765,
          rub: 27868.05,
          pln: 1445.85,
        },
      },
    },
  };

  constructor(
    private sharedService: SharedService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private router: Router,
    private http: HttpClient,
    private cart: CartOrderService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userId = this.userService.getCurrentUserId();
    this.sharedService.selectedForwardFlight.asObservable().subscribe((res) => {
      this.forwardData = res;
      console.log(this.forwardData);
    });
    this.sharedService.selectedBackwardFlight
      .asObservable()
      .subscribe((res) => {
        this.backwardData = res;
        console.log(this.backwardData);
      });
    this.activatedRoute.queryParams.subscribe((res) => {
      this.passengers = res['passengers'].split(',');
      console.log(this.passengers);
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
        console.log(this.forwardFlightPrice);
        if (this.backwardData) {
          this.backwardFlightPrice = this.backwardData.price.usd;
        }
        break;
      case 'EUR':
        this.forwardFlightPrice = this.forwardData.price.eur;
        console.log(this.forwardFlightPrice);
        if (this.backwardData) {
          this.backwardFlightPrice = this.backwardData.price.eur;
        }
        console.log(this.backwardFlightPrice);
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
      this.adultTotalFare +
      this.childTotalFare +
      this.infantTotalFare
    ).toFixed(2);
    if (this.backwardData.flightNumber !== undefined) {
      this.numberOfTickets = 2;
    } else {
      this.numberOfTickets = 1;
    }
  }

  goBack() {
    this.location.back();
  }

  addToCart() {
    this.sharedService.getAddToCardNumber(this.numberOfTickets);
    this.router.navigateByUrl(RoutesPaths.MainPage);
  }

  goToUserAccount() {
    this.router.navigateByUrl(RoutesPaths.UserAccountPage);
  }

  proceedToPayment() {
    this.forwardData.completed = false;
    this.backwardData.completed = false;
    this.localStorageData.push(this.forwardData, this.backwardData);
    alert('Payment was successfull');
    this.router.navigateByUrl(RoutesPaths.ShoppingCart);
    localStorage.setItem(this.userId, JSON.stringify(this.localStorageData));
  }
}
