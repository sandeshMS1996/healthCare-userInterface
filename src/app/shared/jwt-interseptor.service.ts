import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
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
    /*console.log(req.headers);
    console.log(req.body);*/
    const currentUser = this.authService.getCurrentUser();
    const isloggedIn = currentUser && currentUser.password;
    const isApiUrl = req.url.startsWith(environment.resourceServerURl);
    if (isloggedIn) {
      req = req.clone({
        setHeaders: {
          Authorization: `bearer ${currentUser.password}`
        }
      });
    }
    console.log(req.headers);
    console.log(req.url);
    return next.handle(req);
  }
}
