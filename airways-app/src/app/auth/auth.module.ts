import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabDialogComponent } from './dialog/tab-dialog/tab-dialog.component';
import { SigninComponent } from './dialog/signin/signin.component';
import { SignupComponent } from './dialog/signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EmailComponent } from './components/email/email.component';
import { FirstNameComponent } from './components/first-name/first-name.component';
import { LastNameComponent } from './components/last-name/last-name.component';
import { DateBirthComponent } from './components/date-birth/date-birth.component';
import { GenderComponent } from './components/gender/gender.component';
import { CountryCodeComponent } from './components/country-code/country-code.component';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';


@NgModule({
  declarations: [
    TabDialogComponent,
    SigninComponent,
    SignupComponent,
    EmailComponent,
    FirstNameComponent,
    LastNameComponent,
    DateBirthComponent,
    GenderComponent,
    CountryCodeComponent,
    PhoneNumberComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule
  ],
  exports: [
    TabDialogComponent,
    SigninComponent,
    SignupComponent,
    EmailComponent,
    FirstNameComponent,
    LastNameComponent,
    DateBirthComponent,
    GenderComponent,
    CountryCodeComponent,
  ],
})
export class AuthModule { }
