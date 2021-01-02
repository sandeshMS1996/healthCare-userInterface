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
  public getCurrentUser(): UserModel {
    return this.userSubject.value;
  }
  public authenticate(user: UserModel): UserModel {
    if (user.username === 'sandesh' && user.password === 'san') {
      user.isAuthenticated = true;
      user.role = 'user';
      user.password =  'san_JWT';
      // this.loggedInUser = user;
      this.storeUserData(user);
    } else if (user.username === 'ramesh' && user.password === 'ram' ) {
      user.isAuthenticated = true;
      user.role = 'admin';
      user.password =  'ram_JWT';
      this.storeUserData(user);
      // this.loggedInUser = user;
    }
    return user;
  }
  private storeUserData(user: UserModel): void {
    /*if (user.username != null && user.role != null && user.password != null) {
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);
      localStorage.setItem('jwt', user.password);
    }*/
    localStorage.setItem('user', JSON.stringify(user));
  }
  /*public retrieveUserData(): UserModel {
    const username = localStorage.getItem('username');
    const  role =  localStorage.getItem('role');
    const  jwt = localStorage.getItem('jwt');
    if (jwt != null && username != null && role != null) {
      const user = new UserModel();
      user.username = username;
      user.role = role;
      user.password = jwt;
      user.isAuthenticated = true;
      // this.userData.next(user);
      return user;
    }
    return null;
  }*/
  private logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

}
