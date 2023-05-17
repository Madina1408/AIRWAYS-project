import { Injectable } from '@angular/core';
import { TOKEN } from '../../models/constants/token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  saveToStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  clearStorage() {
    localStorage.removeItem(TOKEN);
  }
}
