import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestBuilderService {

  constructor(private readonly http: HttpClient) {}

  public post<T>(url: string, data: unknown): Observable<T> {
    return this.http.post<T>(url, data);
  }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
