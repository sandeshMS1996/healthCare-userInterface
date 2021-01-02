import { Injectable } from '@angular/core';
import {UserModel} from './User.model';

@Injectable({
  providedIn: 'root'
})
export class AppAuthenticationService {
  constructor() { }
  public authenticate(user: UserModel): UserModel {
    if (user.username === 'sandesh' && user.password === 'san') {
      user.isAuthenticated = true;
      user.role = 'user';
      localStorage.setItem('jwt', 'san_JWT');
    } else if (user.username === 'ramesh' && user.password === 'ram' ) {
      user.isAuthenticated = true;
      user.role = 'admin';
      localStorage.setItem('jwt', 'ram_JWT');
    }
    return user;
  }
}
