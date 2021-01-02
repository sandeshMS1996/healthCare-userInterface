import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppAuthenticationService} from '../shared/app-authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {
  username;
  constructor(private userService: AppAuthenticationService) { }

  ngOnInit(): void {
    this.userService.UserDetails.subscribe( a => {
      this.username = a.username + 'gutter';
      console.log(this.username);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.username);
  }

}
