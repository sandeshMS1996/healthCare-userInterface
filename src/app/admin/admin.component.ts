import { Component, OnInit } from '@angular/core';
import {AdminService} from './admin.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor( private adminService: AdminService) {
    console.log('admin component');
  }

  ngOnInit(): void {
  }

  fire(): void {
    console.log('file');
    /*this.adminService.testAdmin()
      .pipe(first())
      .subscribe(value => console.log(value), error => console.log(error));*/
  }
}
