import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import citizenship from 'src/app/shared/models/constants/citizenship';
import { ToolTips } from 'src/app/shared/models/enums/tool-tips';
import { ISignUpRequest } from 'src/app/shared/models/interfaces/signup-interface';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { EmailComponent } from '../../components/email/email.component';
import { FirstNameComponent } from '../../components/first-name/first-name.component';
import { LastNameComponent } from '../../components/last-name/last-name.component';
import { DateBirthComponent } from '../../components/date-birth/date-birth.component';
import { GenderComponent } from '../../components/gender/gender.component';
import { CountryCodeComponent } from '../../components/country-code/country-code.component';
import { PhoneNumberComponent } from '../../components/phone-number/phone-number.component';
import { TabDialogComponent } from '../tab-dialog/tab-dialog.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild(EmailComponent) emailComponent!: EmailComponent;
  @ViewChild(FirstNameComponent) firstNameComponent!: FirstNameComponent;
  @ViewChild(LastNameComponent) lastNameComponent!: LastNameComponent;
  @ViewChild(DateBirthComponent) dateBirthComponent!: DateBirthComponent;
  @ViewChild(CountryCodeComponent) countryCodeComponent!: CountryCodeComponent;
  @ViewChild(PhoneNumberComponent) phoneNumberComponent!: PhoneNumberComponent;

  hide = true;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  toolTips = ToolTips;

  citizenshipList = citizenship;
  isPolicyAgree = true;

  selectedEmail = '';
  selectedFirstName = '';
  selectedLastName = '';
  selectedDateBirth!: Date | null;
  selectedGender = '';
  selectedCountryCode = '';
  selectedPhoneNumber = '';

  signUpForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/\d/),
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[!@#?]/)
    ]),
    citizenship: new FormControl('', Validators.required),
    policy: new FormControl(this.isPolicyAgree, Validators.requiredTrue)
  });

  constructor (
    private authService: AuthService,
    private notification: NotificationService,
    private tabDialog: TabDialogComponent) {}

  get passwordControl() {
    return this.signUpForm.get('password');
  }

  get citizenshipControl() {
    return this.signUpForm.get('citizenship');
  }

  get policyControl() {
    return this.signUpForm.get('policy');
  }

  OnEmailChange(value: string): void {
    this.selectedEmail = value;
  }

  OnFirstNameChange(value: string): void {
    this.selectedFirstName = value;
  }

  OnLastNameChange(value: string): void {
    this.selectedLastName = value;
  }

  onDateBirthChange(value: Date | null): void {
    this.selectedDateBirth = value;
  }

  onGenderChange(value: string): void {
    this.selectedGender = value;
  }

  onCountryCodeChange(value: string): void {
    this.selectedCountryCode = value;
  }

  onPhoneNumberChange(value: string): void {
    this.selectedPhoneNumber = value;
  }

  getPasswordErrorMessage(): string {
    const passwordValue = this.passwordControl?.value!;

    if (this.passwordControl?.hasError('required')) {
      return 'Please enter your password';
    }
    if (this.passwordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    if (!/\d/.test(passwordValue)) {
      return 'Password must contain at least one digit';
    }
    if (!/[A-Z]/.test(passwordValue)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(passwordValue)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[^\w\s']/.test(passwordValue)) {
      return 'Password must contain at least one special character';
    }
    return '';
  }

  OnPolicyArgee(): void {
    this.isPolicyAgree = !this.isPolicyAgree;
  }

  resetForm(): void {
    this.signUpForm.reset();
    Object.keys(this.signUpForm.controls).forEach(key => {
      this.signUpForm.get(key)?.setErrors(null) ;
    });

    this.emailComponent.emailControl.reset();
    this.firstNameComponent.firstNameControl.reset();
    this.lastNameComponent.lastNameControl.reset();
    this.dateBirthComponent.dateBirthControl.reset();
    this.countryCodeComponent.countryCodeControl.reset();
    this.phoneNumberComponent.phoneNumberControl.reset();


    this.emailComponent.emailControl.setErrors(null);
    this.firstNameComponent.firstNameControl.setErrors(null);
    this.lastNameComponent.lastNameControl.setErrors(null);
    this.dateBirthComponent.dateBirthControl.setErrors(null);
    this.countryCodeComponent.countryCodeControl.setErrors(null);
    this.phoneNumberComponent.phoneNumberControl.setErrors(null);
  }

  goToSignInTab() {
    this.tabDialog.changeTabIndex(0);
  }

  OnSubmitRegistration() {
    const userData: ISignUpRequest = {
      email: this.selectedEmail,
      password: this.passwordControl?.value!,
      firstName: this.selectedFirstName,
      lastName: this.selectedLastName,
      dateOfBirth: this.selectedDateBirth!.toISOString(),
      gender: this.selectedGender,
      countryCode: this.selectedCountryCode,
      phone: this.selectedPhoneNumber,
      citizenship: this.citizenshipControl?.value!,
    };

    this.authService.signUp(userData).subscribe({
      next: () => {
        this.notification.openSuccessSnackBar('Registration is successful! You can sign in.');
        this.resetForm();
        this.goToSignInTab();
      },
      error: (err) => {
        this.notification.openFailureSnackBar(`Registration failed. ${err.error.message}`);
      }
    });
  }
}
