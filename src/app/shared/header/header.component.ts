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
    console.log('running cons');
  }

  ngOnInit(): void {
    console.log('running on init');
    this.AuthService.UserDetails.subscribe((u: UserModel) => {
      this.username = u.username;
      console.log('header outside ' + this.username);
    });
    console.log('header ' + this.username);
    console.log('completing on init');
  }
  onclick() {
    console.log(this.username);
  }
  logout(): void {
    if (true/*confirm('you will be logged out')*/) {
      localStorage.removeItem('jwt');
      this.router.navigateByUrl('/');
    }
  }
}
