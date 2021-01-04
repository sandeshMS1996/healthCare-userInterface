import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppAuthenticationService} from '../app-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(private router: Router, private AuthService: AppAuthenticationService) {
  }

  ngOnInit(): void {
    this.username = this.AuthService.getCurrentUser().username;
  }
  logout(): void {
    this.AuthService.logout();
  }
}
