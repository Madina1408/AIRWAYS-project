import { Injectable } from '@angular/core';
import { ISearchFlight } from '../../models/interfaces/search-flight-interface';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private stepCompletionStatus: boolean[] = [ false, false, false ];

  saveQueryParamsToStorage(queryParams: ISearchFlight) {
    const key = 'queryParams';
    sessionStorage.setItem(key, JSON.stringify(queryParams));
  }

  getQueryParamsFromStorage(): ISearchFlight | null {
    const key = 'queryParams';
    const jsonString = sessionStorage.getItem(key);
    return JSON.parse(jsonString!);
  }

  setStepCompletionStatus(index: number, isCompleted: boolean): void {
    this.stepCompletionStatus[index] = isCompleted;
    sessionStorage.setItem(`step${index}CompletionStatus`, JSON.stringify(isCompleted));
  }

  getStepCompletionStatus(index: number): string | null {
    return sessionStorage.getItem(`step${index}CompletionStatus`);
  }

  sessionStorageClear() {
    sessionStorage.clear();
  }

}
