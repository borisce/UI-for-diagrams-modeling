import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if(request.url.includes('github')) {
        return throwError(err);
      }
      if (request.url.includes('auth/login')) {
        switch (err.status) {
          case 401:
            return throwError('Incorrect password!');
          case 500:
            return throwError('Incorrect name or password!');
          default:
            return throwError(err.error.message || err.statusText);
        }
      } else {
        return throwError(err.error.message || err.statusText);
      }
    }));
  }
}

