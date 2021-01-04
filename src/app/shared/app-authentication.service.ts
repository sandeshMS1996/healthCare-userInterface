import {Injectable} from '@angular/core';
import {UserModel} from './User.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppAuthenticationService {
  private currentUser: Observable<UserModel>;
  private userSubject: BehaviorSubject<UserModel>;

  constructor(private router: Router, private httpClient: HttpClient) {
    console.log(JSON.parse(localStorage.getItem('user')));
    this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.userSubject.asObservable();
  }

  private static storeUserData(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getCurrentUser(): UserModel {
    return this.userSubject.value;
  }

  public authenticate(username: string, password: string): boolean {
    const body = 'client_id=client1' + '&grant_type=password' + '&scope=USER' + '&username=' + username + '&password=' + password;
    let jwt = '';
    this.httpClient.post('http://localhost:8080/oauth/token', body, {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Basic ' + btoa('client1:secret')
      })
    }).pipe(map(user => {
        console.log('inside pipe');
        console.log(user[`access_token`]);
    }));

      /*subscribe(a => {
        jwt = a[`access_token`];
      });
    if (jwt !== null || jwt !== ' ') {
      const user = new UserModel(username, jwt, 'ROLE_USER', true);
      AppAuthenticationService.storeUserData(user);
      this.userSubject.next(user);
      return true;
    }*/
    return false;
  }

  /*if (user.username === 'sandesh' && user.password === 'san') {
    user.isAuthenticated = true;
    user.role = 'ROLE_USER';
    user.password = 'san_JWT';
    // this.loggedInUser = user;
    AppAuthenticationService.storeUserData(user);
    this.userSubject.next(user);
  } else if (user.username === 'ramesh' && user.password === 'ram') {
    user.isAuthenticated = true;
    user.role = 'ROLE_ADMIN';
    user.password = 'ram_JWT';
    AppAuthenticationService.storeUserData(user);
    this.userSubject.next(user);
    // this.loggedInUser = user;
  }
  return user;
}*/

  public logout(): void {
    console.log(localStorage.getItem('user'));
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('login').then();
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public get(): void {

  }
}
