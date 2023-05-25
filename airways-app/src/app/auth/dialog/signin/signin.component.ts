import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogInRequest } from 'src/app/shared/models/interfaces/login-interface';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { EmailComponent } from '../../components/email/email.component';
import { UserService } from '../../services/user/user.service';
import { MatdialogService } from '../../services/matdialog/matdialog.service';
import { Router } from '@angular/router';
import { TOKEN } from 'src/app/shared/models/constants/token';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  @ViewChild(EmailComponent) emailComponents!: EmailComponent;

  hide = true;

  selectedEmail = '';

  signInForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/\d/),
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[!@#?]/)
    ]),
  });

  constructor (
    private authService: AuthService,
    private storageService: LocalStorageService,
    private notification: NotificationService,
    private userService: UserService,
    private dialofService: MatdialogService,
    private router: Router
  ) {}

  get passwordControl() {
    return this.signInForm.get('password');
  }

  OnEmailChange(value: string) {
    this.selectedEmail = value;
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
      return 'Password must contain at least one special character';
    }
    return '';
  }

  resetForm(): void {
    this.signInForm.reset();
    this.emailComponents.emailControl.reset();

    this.passwordControl?.setErrors(null);
    this.emailComponents.emailControl.setErrors(null);
  }

  onSubmitLogIn(): void {
    const userData: ILogInRequest = {
      email: this.selectedEmail,
      password: this.passwordControl?.value!,
    };

    this.authService.logIn(userData).subscribe({
      next: (data) => {
        this.storageService.saveToStorage(TOKEN, data.token);
        this.notification.openSuccessSnackBar('Login is successful!');
        this.resetForm();
        this.dialofService.closeDialog();
      },
      error: (err) => {
        this.notification.openFailureSnackBar(`Login failed. ${err.error.message}`);
      }
    });
  }
}
