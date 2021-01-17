import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppAuthenticationService} from '../app-authentication.service';
import {UserService} from '../../user/user.service';
import {CartService} from '../../user/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(private router: Router, private AuthService: AppAuthenticationService, public cartService: CartService) {
  }

  ngOnInit(): void {
    this.username = this.AuthService.getCurrentUser().username;
  }
  logout(): void {
    this.AuthService.logout();
  }
}
