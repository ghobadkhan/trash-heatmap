import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiToken = localStorage.getItem("api_token")
    if (apiToken) {
      request = request.clone({
        setHeaders: {
          api_token: apiToken
        }
      })
    }
    return next.handle(request);
  }
}
