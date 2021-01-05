import {Injectable} from '@angular/core';
import {UserModel} from './User.model';
import {BehaviorSubject, Observable, pipe, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, first, map} from 'rxjs/operators';

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
    console.log(JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getCurrentUser(): UserModel {
    return this.userSubject.value;
  }
  public authenticate(username: string, password: string): Observable<any> {
    const body = 'client_id=client1' + '&grant_type=password' + '&scope=USER' + '&username=' + username + '&password=' + password;
    return this.httpClient.post<any>('http://localhost:8080/oauth/token', body, {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Basic ' + btoa('client1:secret')
      })
    }).pipe(map(user => {
      if (user && user[`access_token`]) {
        const userData = new UserModel(username, user[`access_token`], 'ROLE_USER', true);
        this.userSubject.next(userData);
        AppAuthenticationService.storeUserData(userData);
      }
      return user;
    }));
  }
  public logout(): void {
    console.log(localStorage.getItem('user'));
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('login').then();
  }
}
