import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppAuthenticationService} from '../shared/app-authentication.service';
import {UserModel} from '../shared/User.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username;
  constructor(private userService: AppAuthenticationService) {
    console.log('user component');
  }

  ngOnInit(): void {
    this.username = this.userService.getCurrentUser().username;
  }

}
