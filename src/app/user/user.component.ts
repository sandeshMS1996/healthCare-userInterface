import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppAuthenticationService} from '../shared/app-authentication.service';
import {UserModel} from '../shared/User.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {
  username;
  constructor(private userService: AppAuthenticationService) { }

  ngOnInit(): void {
    /*this.userService.UserDetails.subscribe( a => {
      this.username = a.username + 'gutter';
      console.log(this.username);
    });*//*
    this.userService.userData.subscribe((a: UserModel) => {
      this.username = a.username;
    });*/
    this.username = this.userService.getCurrentUser().username;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.username);
  }

}
