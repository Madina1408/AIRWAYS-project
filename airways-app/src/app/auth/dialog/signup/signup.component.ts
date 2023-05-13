import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToolTips } from 'src/app/shared/models/enums/tool-tips';


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
  maxDate = new Date();

  signUpForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/\d/),
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[!@#?]/)
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z\s']+$/),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z\s']+$/),
    ]),
    dateBirth: new FormControl('', [
      Validators.required,
    ])
  });

  get emailControl() {
    return this.signUpForm.get('email');
  }

  get passwordControl() {
    return this.signUpForm.get('password');
  }

  get firstNameControl() {
    return this.signUpForm.get('firstName');
  }

  get lastNameControl() {
    return this.signUpForm.get('lastName');
  }

  get dateBirthControl() {
    return this.signUpForm.get('dateBirth');
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
      return 'Password must contain at least one special character (e.g. !, @, #, or ?)';
    }
    return '';
  }

  getFirstNameErrorMessage(): string {
    const firstNameValue = this.firstNameControl?.value!;

    if (this.firstNameControl?.hasError('required')) {
      return 'Please enter your first name';
    }
    if (!/^[A-Za-z\s']+$/.test(firstNameValue)) {
      return 'Invalid character';
    }
    return '';
  }

  getLastNameErrorMessage(): string {
    const lastNameValue = this.lastNameControl?.value!;

    if (this.lastNameControl?.hasError('required')) {
      return 'Please enter your last name';
    }
    if (!/^[A-Za-z\s']+$/.test(lastNameValue)) {
      return 'Invalid character';
    }
    return '';
  }
}
