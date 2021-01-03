import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppAuthenticationService} from './app-authentication.service';
import {audit} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(public authService: AppAuthenticationService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authService.getCurrentUser();
      console.log(route.data);
      if (route.data.role == null) {
        return true;
      }
      if (user.role && route.data.role.indexOf(user.role) !== -1) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
}
