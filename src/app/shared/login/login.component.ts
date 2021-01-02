import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {strict} from 'assert';
import {FromValidationService} from '../from-validation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = new FormGroup({
    userName: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(5)])),
    password: new FormControl('', Validators.compose(
      [Validators.required]
    ))
  });
  formSubmitted = false;
  constructor(private validationService: FromValidationService) { }

  ngOnInit(): void {
  }
  evaluateUser(): string[] {
   this.formSubmitted = true;
   return this.validationService.evaluateUser(this.loginData);
  }
}
