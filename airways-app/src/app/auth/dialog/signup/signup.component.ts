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

  @ViewChild(EmailComponent) emailComponents!: EmailComponent;
  @ViewChild(FirstNameComponent) firstNameComponentComponents!: FirstNameComponent;
  @ViewChild(LastNameComponent) lastNameComponentComponents!: LastNameComponent;
  @ViewChild(DateBirthComponent) dateBirthComponentComponents!: DateBirthComponent;
  @ViewChild(GenderComponent) genderComponent!: GenderComponent;
  @ViewChild(CountryCodeComponent) countryCodeComponent!: CountryCodeComponent;
  @ViewChild(PhoneNumberComponent) phoneNumberComponent!: PhoneNumberComponent;

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

    this.emailComponents.emailControl.reset();
    this.firstNameComponentComponents.firstNameControl.reset();
    this.lastNameComponentComponents.lastNameControl.reset();
    this.dateBirthComponentComponents.dateBirthControl.reset();
    this.genderComponent.genderControl.reset();
    this.countryCodeComponent.countryCodeControl.reset();
    this.phoneNumberComponent.phoneNumberControl.reset();


    this.emailComponents.emailControl.setErrors(null);
    this.firstNameComponentComponents.firstNameControl.setErrors(null);
    this.lastNameComponentComponents.lastNameControl.setErrors(null);
    this.dateBirthComponentComponents.dateBirthControl.setErrors(null);
    this.genderComponent.genderControl.setErrors(null);
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
