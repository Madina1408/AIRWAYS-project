import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  hide = true;
  isSignInFailed = false;
  isSuccessful = false;
  errorMessage = '';

  signInForm = new FormGroup({
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
  });

  get emailControl() {
    return this.signInForm.get('email');
  }

  get passwordControl() {
    return this.signInForm.get('password');
  }

  getPasswordErrorMessage(): string {
    if (this.signInForm.controls.password.hasError('required')) {
      return 'Please enter your password';
    }
    if (this.signInForm.controls.password.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    const passwordValue = this.signInForm.controls.password.value!;
    if (!/\d/.test(passwordValue)) {
      return 'Password must contain at least one digit';
    }
    if (!/[A-Z]/.test(passwordValue)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(passwordValue)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[!@#?]/.test(passwordValue)) {
      return 'Password must contain at least one special character (e.g. !, @, #, or ?)';
    }
    return '';
  }
}
