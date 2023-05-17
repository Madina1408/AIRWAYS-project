import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { TOKEN } from 'src/app/shared/models/constants/token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = this.storageService.getFromStorage(TOKEN);
      if (token !== null) {
        return next.handle(
          request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
          })
        );
      } else {
        return next.handle(request);
      }
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
