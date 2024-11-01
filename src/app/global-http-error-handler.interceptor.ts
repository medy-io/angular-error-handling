import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (error, retryCount) => timer(retryCount * 1000),
      }),
      catchError((error: Error) => {
        console.log('error inside interceptor');
        return throwError((error: Error) => {
          console.log('inside interceptor throw error');
          return error;
        });
      })
    );
  }
}
