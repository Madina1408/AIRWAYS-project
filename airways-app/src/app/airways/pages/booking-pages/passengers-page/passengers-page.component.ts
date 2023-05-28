import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, finalize } from 'rxjs';
import { PassengersService } from 'src/app/airways/services/passengers/passengers.service';
import { CountryCodeComponent } from 'src/app/auth/components/country-code/country-code.component';
import { DateBirthComponent } from 'src/app/auth/components/date-birth/date-birth.component';
import { EmailComponent } from 'src/app/auth/components/email/email.component';
import { FirstNameComponent } from 'src/app/auth/components/first-name/first-name.component';
import { LastNameComponent } from 'src/app/auth/components/last-name/last-name.component';
import { PhoneNumberComponent } from 'src/app/auth/components/phone-number/phone-number.component';
import { UserService } from 'src/app/auth/services/user/user.service';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { ICountryCode } from 'src/app/shared/models/interfaces/country-code';
import { IPassengerContacts, IPassengerData, IPassengerInfo } from 'src/app/shared/models/interfaces/passengers-interface';
import { ISearchFlight } from 'src/app/shared/models/interfaces/search-flight-interface';


@Component({
  selector: 'app-passengers-page',
  templateUrl: './passengers-page.component.html',
  styleUrls: ['./passengers-page.component.scss'],
})
export class PassengersPageComponent implements OnInit {
  @ViewChild(FirstNameComponent) firstNameComponent!: FirstNameComponent;
  @ViewChild(LastNameComponent) lastNameComponent!: LastNameComponent;
  @ViewChild(DateBirthComponent) dateBirthComponent!: DateBirthComponent;
  @ViewChild(CountryCodeComponent) countryCodeComponent!: CountryCodeComponent;
  @ViewChild(PhoneNumberComponent) phoneNumberComponent!: PhoneNumberComponent;
  @ViewChild(EmailComponent) emailComponent!: EmailComponent;

  queryParams: ISearchFlight = {
    fromKey: '',
    toKey: '',
    forwardDate: '',
    backDate: '',
    passengers: '',
    fromCity: '',
    toCity: '',
  };

  adultsCount: number = 0;
  childCount: number = 0;
  infantCount: number = 0;
  passengers: IPassengerData[] = [];
  contactDetails: IPassengerContacts | undefined = undefined;
  initialCountryCode = '';
  initialPhoneNumber = '';
  initialEmail = '';

  subscriptions: Subscription[] = [];

  registeredUser: IPassengerInfo = {
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    countryCode: '',
    phone: '',
    citizenship: ''
  };

  passengersForm = new FormGroup({});

  isValidForm = false;

  loadingPassengers = true;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private passengerService: PassengersService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activateRoute.queryParams.subscribe((res) => {
        this.queryParams.backDate = res['backDate'];
        this.queryParams.forwardDate = res['forwardDate'];
        this.queryParams.toCity = res['toCity'];
        this.queryParams.fromCity = res['fromCity'];
        this.queryParams.toKey = res['toKey'];
        this.queryParams.fromKey = res['fromKey'];
        this.queryParams.passengers = res['passengers'];
      }),
      this.userService.getCurrentUserData()!
      .pipe(finalize(() => this.loadingPassengers = false))
      .subscribe(data => {
        this.registeredUser = data;
        this.parsePassengerString( this.queryParams.passengers);
      })
    );
  }

  private parsePassengerString(passengersString: string) {
    let passengersList: string[] = [];
    if (!passengersString.includes(',')) {
      passengersList = passengersString.split('');
    }
    passengersList = passengersString.split(', ');
    let index = 1;

    passengersList.forEach(passenger => {
      const [count, type] = passenger.split(' ');

      if (type.toLowerCase() === 'adult') {
        this.adultsCount = parseInt(count);
        for (let i = 1; i <= this.adultsCount; i++) {
          const existingPassengerAdult = this.passengerService.getPassengerByIndex(index);
          if (existingPassengerAdult) {
            this.passengers.push(existingPassengerAdult);
          } else {
            this.createPassengersArray(index, type);
          }
          index++;
        }
      } else if (type.toLowerCase() === 'child') {
        this.childCount = parseInt(count);
        for (let i = 1; i <= this.childCount; i++) {
          const existingPassengerChild = this.passengerService.getPassengerByIndex(index);
          if (existingPassengerChild) {
            this.passengers.push(existingPassengerChild);
          } else {
            this.createPassengersArray(index, type);
          }
          index++;
        }
      } else if (type.toLowerCase() === 'infant') {
        this.infantCount = parseInt(count);
        for (let i = 1; i <= this.infantCount; i++) {
          const existingPassengerInfant = this.passengerService.getPassengerByIndex(index);
          if (existingPassengerInfant) {
            this.passengers.push(existingPassengerInfant);
          } else {
            this.createPassengersArray(index, type);
          }
          index++;
        }
      }
      this.contactDetails = this.passengerService.getContactDetails();
      if (!this.contactDetails) {
        this.contactDetails = {
          countryName: this.registeredUser.citizenship,
          countryCode: this.registeredUser.countryCode,
          phoneNumber: this.registeredUser.phone,
          email: this.registeredUser.email };

      };
      this.setInitialContactDetailsValues(this.contactDetails);
    });
  }

  private createPassengersArray(index: number, type: string) {
    if (index === 1) {
      this.passengers.push({
        index: index,
        type: type,
        firstName: this.registeredUser.firstName,
        lastName: this.registeredUser.lastName,
        gender: this.registeredUser.gender || 'Male',
        dateBirth: this.registeredUser.dateOfBirth,
        needAssistance: false,
        needCheckedBaggage: false
      });
    } else {
      this.passengers.push({
        index: index,
        type: type,
        firstName: '',
        lastName: '',
        gender: 'Male',
        dateBirth: '',
        needAssistance: false,
        needCheckedBaggage: false
      });
    }
  }

  private setInitialContactDetailsValues(contactDetails: IPassengerContacts) {
    this.initialCountryCode = `${contactDetails.countryName} ${contactDetails.countryCode}`;
    this.initialPhoneNumber = contactDetails.phoneNumber;
    this.initialEmail = contactDetails.email;
  }

  handleFirstNameChange(passenger: IPassengerData, value: string) {
    passenger.firstName = value;
    this.passengerService.setPassenger(passenger.index, passenger);
  }

  handleLastNameChange(passenger: IPassengerData, value: string) {
    passenger.lastName = value;
    this.passengerService.setPassenger(passenger.index, passenger);
  }

  handleGenderChange(passenger: IPassengerData, value: string) {
    passenger.gender = value;
    this.passengerService.setPassenger(passenger.index, passenger);
  }

  handleDateBirthChange(passenger: IPassengerData, value: Date | null) {
    passenger.dateBirth = value!.toISOString();
    this.passengerService.setPassenger(passenger.index, passenger);
  }

  handleAssistanceChange(passenger: IPassengerData, value: boolean) {
    passenger.needAssistance = value;
    this.passengerService.setPassenger(passenger.index, passenger);
  }

  handleCheckedBaggageChange(passenger: IPassengerData, value: boolean) {
    passenger.needCheckedBaggage = value;
    this.passengerService.setPassenger(passenger.index, passenger);
  }

  handleCountryCodeNameChange(value: string) {
    this.contactDetails!.countryName = value;
    this.passengerService.setContactDetails(this.contactDetails!);
  }

  handleCountryCodeChange(value: string) {
    this.contactDetails!.countryCode = value;
    this.passengerService.setContactDetails(this.contactDetails!);
  }

  handlePhoneNumberChange(value: string) {
    this.contactDetails!.phoneNumber = value;
    this.passengerService.setContactDetails(this.contactDetails!);
  }

  handleEmailChange(value: string) {
    this.contactDetails!.email = value;
    this.passengerService.setContactDetails(this.contactDetails!);
  }

  continueToNextStep() {
    if (this.firstNameComponent.firstNameControl.valid &&
      this.lastNameComponent.lastNameControl.valid &&
      this.dateBirthComponent.dateBirthControl.valid &&
      this.countryCodeComponent.countryCodeControl.valid &&
      this.phoneNumberComponent.phoneNumberControl.valid &&
      this.emailComponent.emailControl.valid) {
        this.router.navigate([RoutesPaths.BookingPageStep3], {
        queryParams: this.queryParams,
      });
    }
  }

  returnToPrevStep() {
    this.router.navigate([RoutesPaths.BookingPageStep1], {
      queryParams: this.queryParams,
    });
  }
}
