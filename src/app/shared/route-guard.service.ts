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
      console.log(/*route.data.role + ' ' +*/ user);
      if (route.data.role == null) {
        return true;
      }
      if (!user) {
        this.router.navigate(['login']).then();
        return false;
      }
      if (route.data.role.indexOf(user.role) !== -1) {
        return true;
      }
      console.log('redirecting');
      this.authService.logout();
      /*if (user.role === 'ROLE_USER') {
        this.router.navigate(['/user']);
      }*/
      return false;
  }
}
