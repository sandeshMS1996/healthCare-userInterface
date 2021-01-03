import {Injectable} from '@angular/core';
import {UserModel} from './User.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAuthenticationService {
  private currentUser: Observable<UserModel>;
  private userSubject: BehaviorSubject<UserModel>;
  constructor() {
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
  public authenticate(user: UserModel): UserModel {
    if (user.username === 'sandesh' && user.password === 'san') {
      user.isAuthenticated = true;
      user.role = 'ROLE_USER';
      user.password =  'san_JWT';
      // this.loggedInUser = user;
      AppAuthenticationService.storeUserData(user);
      this.userSubject.next(user);
    } else if (user.username === 'ramesh' && user.password === 'ram' ) {
      user.isAuthenticated = true;
      user.role = 'ROLE_ADMIN';
      user.password =  'ram_JWT';
      AppAuthenticationService.storeUserData(user);
      this.userSubject.next(user);
      // this.loggedInUser = user;
    }
    return user;
  }
  public logout(): void {
    console.log(localStorage.getItem('user'));
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

}
