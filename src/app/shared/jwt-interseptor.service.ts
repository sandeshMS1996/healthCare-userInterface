import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppAuthenticationService} from './app-authentication.service';
import {audit} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterseptorService implements HttpInterceptor{

  constructor(private authService: AppAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getCurrentUser();
    const isloggedIn = currentUser && currentUser.password;
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    if (isApiUrl && isloggedIn) {
      req = req.clone({
        setHeaders: {
          Authorization: `bearer ${currentUser.password}`
        }
      });
    }
    return next.handle(req);
  }
}
