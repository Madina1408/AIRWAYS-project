import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UserService } from 'src/app/auth/services/user/user.service';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  cartFlights?: IGotFlightData[];
}
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  flights: Task = {
    name: 'Select All',
    completed: false,
    color: 'primary',
    cartFlights: [
      {
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
      },
      {
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
      },
      {
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
      },
    ],
  };
  userId?:string;
  cartData:any;

  constructor(private userService:UserService){}
  allComplete: boolean = false;
  ngOnInit(): void {
    this.userId=this.userService.getCurrentUserId();
  const data:any = (localStorage.getItem(this.userId));
  this.cartData=JSON.parse(data);
  console.log(this.cartData);
  this.flights.cartFlights=this.cartData
  }
  updateAllComplete() {
    this.allComplete =
      this.flights.cartFlights != null &&
      this.flights.cartFlights.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.flights.cartFlights == null) {
      return false;
    }
    return (
      this.flights.cartFlights.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.flights.cartFlights == null) {
      return;
    }
    this.flights.cartFlights.forEach((t) => (t.completed = completed));
  }
}
