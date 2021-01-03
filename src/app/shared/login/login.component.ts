import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FromValidationService} from '../from-validation.service';
import {UserModel} from '../User.model';
import {AppAuthenticationService} from '../app-authentication.service';
import {ActivatedRoute, Router} from '@angular/router';


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
  constructor(private validationService: FromValidationService,
              private authService: AppAuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }
  evaluateUser(): string[] {
   this.formSubmitted = true;
   return this.validationService.evaluateUser(this.loginData);
  }

  submitForm(): void {
    const userModel = new UserModel();
    if (this.loginData.valid) {
      userModel.username = this.loginData.controls[`userName`].value;
      userModel.password = this.loginData.controls[`password`].value;
      const auth = this.authService.authenticate(userModel);
      if (auth.isAuthenticated === true) {
        if (auth.role === 'ROLE_USER') {
              this.router.navigateByUrl('user').then();
          }
          else if (auth.role === 'ROLE_ADMIN') {
             this.router.navigateByUrl('admin').then();
        }
      }
    } else {
      this.evaluateUser();
    }

  }

  }

