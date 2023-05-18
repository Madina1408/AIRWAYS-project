import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUrl = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  canActivate() {
    this.currentUrl = this.router.url;
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.notificationService.openFailureSnackBar('Please proceed to Sign in or Register!');
      this.router.navigateByUrl(this.currentUrl);
      return false;
    }
  }
}
