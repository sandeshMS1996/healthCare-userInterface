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
  ret = false;
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
    // let ret = true;
    const body = 'client_id=client1' + '&grant_type=password' + '&scope=USER' + '&username=' + username + '&password=' + password;
    const jwt = '';
    const code = this.httpClient.post<any>('http://localhost:8080/oauth/token', body, {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Basic ' + btoa('client1:secret')
      }),
      observe: 'response'
    }).pipe(catchError(this.handleError));
    code.pipe(first()).subscribe((data) => {
      console.log(data);
      if (data && data.body[`access_token`]) {
        const currentUser = new UserModel(username, data.body[`access_token`], 'ROLE_ADMIN', true);
        if (currentUser.role === 'ROLE_ADMIN') {
          this.router.navigateByUrl('admin').then();
        } else if (currentUser.role === 'ROLE_USER') {
          this.router.navigateByUrl('admin').then();
        }
        this.userSubject.next(currentUser);
        AppAuthenticationService.storeUserData(currentUser);
        this.ret = true;
      } else {
        this.ret = false;
      }
    });
    return this.ret;
  }
  public logout(): void {
    console.log(localStorage.getItem('user'));
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('login').then();
  }

  handleError(error: HttpErrorResponse) {
    console.log('failed');
    this.ret = false;
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(error.status);
    return throwError(errorMessage);
  }

  public get(): void {

  }
}
