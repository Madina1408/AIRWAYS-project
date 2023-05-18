import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { TOKEN } from 'src/app/shared/models/constants/token';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storageService: LocalStorageService) {}

  getCurrentUserName(): string {
    const token = this.storageService.getFromStorage(TOKEN);
    const decoded: any = jwtDecode(token!);
    return `${decoded.firstName} ${decoded.lastName}`;
  }
}
