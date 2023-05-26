import { Injectable } from '@angular/core';
import { TOKEN } from '../../models/constants/token';
import { IGotFlightData } from '../../models/interfaces/flight-data';

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

  setTypedStorageItem<IGotFlightData>(key: string, value: IGotFlightData[][]): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getTypedStorageItem< IGotFlightData>(key: string): IGotFlightData[][] {
    return JSON.parse(window.localStorage.getItem(key)!) as IGotFlightData[][];
  }

}
