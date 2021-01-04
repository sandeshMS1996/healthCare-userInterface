import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppAuthenticationService} from './shared/app-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'healthCare-userInterface';
  constructor() {
    console.log('app-component');
  }
  ngOnInit(): void {
    /*const userData = this.authService.getCurrentUser();
    if ( userData != null) {
      if ( userData.role === 'user') {
        this.router.navigateByUrl('user').then();
      } else if (userData.role === 'ram_JWT'){
        this.router.navigateByUrl('admin').then();
      }
    }*/
  }

}

