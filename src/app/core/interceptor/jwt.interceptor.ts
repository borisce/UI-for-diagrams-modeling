import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes('github')) {
      const githubAccessToken = localStorage.getItem('github_access_token');

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${githubAccessToken}`
        }
      })

      return next.handle(request);
    }

    const token: string | null = localStorage.getItem('token');
    if (token != null && token.length > 0) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(request);
  }
}
