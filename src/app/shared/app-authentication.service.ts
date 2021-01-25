import {Injectable} from '@angular/core';
import {UserModel} from './User.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

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

  private storeUserData(userModel: UserModel): void {
    console.log('Inside store function');
    const observable = this.httpClient.get<any>(
      environment.authServerUrl + 'api/user/get-role?username=' + userModel.username, {
        // @ts-ignore
        responseType: 'text'
      });
    // @ts-ignore
    observable.pipe(first()).subscribe((value: string) => {
      userModel.role = value.replace('[', '').replace(']', '');
      this.userSubject.next(userModel);
      localStorage.setItem('user', JSON.stringify(userModel));
    });
  }

  public getCurrentUser(): UserModel {
    return this.userSubject.value;
  }
  public authenticate(username: string, password: string): Observable<any> {
    const body = 'client_id=client1' + '&grant_type=password' + '&scope=USER' + '&username=' + username + '&password=' + password;
    return this.httpClient.post<any>(environment.authServerUrl + 'oauth/token', body, {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Basic ' + btoa('client1:secret')
      })
    }).pipe(map((user: UserModel) => {
    if (user && user.access_token) {
      const userModel = new UserModel(user.access_token, user.expires_in);
      this.getRole(username).pipe(first()).subscribe((value: string) => {
        userModel.role = value.replace('[', '').replace(']', '');
        this.userSubject.next(userModel);
        localStorage.setItem('user', JSON.stringify(userModel));
        if (userModel.role === 'ROLE_USER') {
          this.router.navigateByUrl('user').then();
        } else {
          this.router.navigateByUrl('admin').then();
        }
      });
      return userModel;
    }}));
  }
  public logout(): void {
    console.log(localStorage.getItem('user'));
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('login').then();
  }
  public getRole(username: string): Observable<any> {
    return  this.httpClient.get<any>(
      environment.authServerUrl + 'api/user/get-role?username=' + username, {
        // @ts-ignore
        responseType: 'text'
      }).pipe(map( value => {
        return value;
    }));
  }
  checkIfLoginExpiered(): boolean {
    const date = new Date();
    console.log(Math.floor((date).getTime() / 1000)  + ' ' + this.getCurrentUser()?.expires_in / (60 * 60));
    return (Math.floor((date).getTime() / 1000)) >= this.getCurrentUser().expires_in;
  }
}
