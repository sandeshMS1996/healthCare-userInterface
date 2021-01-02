import {Injectable, Output, EventEmitter} from '@angular/core';
import {UserModel} from './User.model';

@Injectable({
  providedIn: 'root'
})
export class AppAuthenticationService {
  @Output() UserDetails  =  new EventEmitter<UserModel>();
  constructor() { }
  public authenticate(user: UserModel): UserModel {
    if (user.username === 'sandesh' && user.password === 'san') {
      user.isAuthenticated = true;
      user.role = 'user';
      localStorage.setItem('jwt', 'san_JWT');
      this.UserDetails.emit(user);
    } else if (user.username === 'ramesh' && user.password === 'ram' ) {
      user.isAuthenticated = true;
      user.role = 'admin';
      localStorage.setItem('jwt', 'ram_JWT');
    }
    return user;
  }
}
