import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import citizenship from 'src/app/shared/models/constants/citizenship';
import { ToolTips } from 'src/app/shared/models/enums/tool-tips';
import { IUserRes } from 'src/app/shared/models/interfaces/user-response-interface';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  hide = true;

  isSignInFailed = false;
  isSuccessful = false;
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

  OnPolicyArgee() {
    this.isPolicyAgree = !this.isPolicyAgree;
  }

  OnSubmitRegistration() {
    const userInfo: IUserRes = {
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
    console.log(userInfo);
  }
}
