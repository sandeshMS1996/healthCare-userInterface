import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppAuthenticationService} from '../app-authentication.service';
import {UserModel} from '../User.model';

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
    /*this.AuthService.currentUser.subscribe((a: UserModel) => {
      this.username = a.username;
    });*/
    // this.username = this.AuthService.getUserInfo()?.username;
    /*console.log('running on init');
    this.AuthService.UserDetails.subscribe((u: UserModel) => {
      this.username = u.username;
      console.log('header outside ' + this.username);
    });
    console.log('header ' + this.username);
    console.log('completing on init');*/
  }
  logout(): void {
    this.AuthService.logout();
    this.router.navigateByUrl('/login').then();
  }
}
