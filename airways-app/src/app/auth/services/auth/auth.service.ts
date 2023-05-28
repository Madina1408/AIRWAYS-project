import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, URL_LOGIN, URL_SIGNUP } from 'src/app/shared/models/constants/api-urls';
import { ILogInRequest, ILogInResponse } from 'src/app/shared/models/interfaces/login-interface';
import { ISignUpRequest, ISignUpResponse } from 'src/app/shared/models/interfaces/signup-interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { RequestBuilderService } from 'src/app/shared/services/request-builder/request-builder.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { Router } from '@angular/router';
import { TOKEN } from 'src/app/shared/models/constants/token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();

  constructor(
    private requestBuilderService: RequestBuilderService,
    private storageService: LocalStorageService,
    private router: Router) { }

  logIn(body: ILogInRequest): Observable<ILogInResponse> {
    return this.requestBuilderService.post(`${BASE_URL}${URL_LOGIN}`, body);
  }

  signUp(body: ISignUpRequest): Observable<ISignUpResponse> {
    return this.requestBuilderService.post(`${BASE_URL}${URL_SIGNUP}`, body);
  }

  isLoggedIn() {
    const token = this.storageService.getFromStorage(TOKEN);
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  signOut(): void {
    this.router.navigate([RoutesPaths.MainPage]);
    this.storageService.clearStorage();
  }
}
