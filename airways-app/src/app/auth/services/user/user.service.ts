import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { BASE_URL, URL_USER } from 'src/app/shared/models/constants/api-urls';
import { TOKEN } from 'src/app/shared/models/constants/token';
import { IPassengerInfo } from 'src/app/shared/models/interfaces/passengers-interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { RequestBuilderService } from 'src/app/shared/services/request-builder/request-builder.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storageService: LocalStorageService,
    private requestBuilderService: RequestBuilderService
  ) {}

  getCurrentUserName(): string {
    const token = this.storageService.getFromStorage(TOKEN);
    if (token) {
      const decoded: any = jwtDecode(token!);
      return `${decoded.firstName} ${decoded.lastName}`;
    } else {
      return '';
    }
  }

  getCurrentUserId(): string {
    const token = this.storageService.getFromStorage(TOKEN);
    if (token) {
      const decoded: any = jwtDecode(token!);
      return decoded.id;
    } else {
      return '';
    }
  }

  getCurrentUserData(): Observable<IPassengerInfo> | null {
    const token = this.storageService.getFromStorage(TOKEN);
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.requestBuilderService.get<IPassengerInfo>(`${BASE_URL}${URL_USER}`, { headers });
    } else {
      return null;
    }
  }
}
