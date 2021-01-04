import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
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
  passwordValidator: false;
  registerData = new FormGroup({
    firstname: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(5)])),
    lastname: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(3)])),
    email: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(6)])),
    phone: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(10)])),
    password: new FormControl('', Validators.compose(
      [Validators.required],
    )),
    ConfirmPassword: new FormControl('', Validators.compose(
      [Validators.required],
    ))
  });
  formSubmitted = false;
  action: string;

  constructor(private validationService: FromValidationService,
              private authService: AppAuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    console.log('login component');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(a => {
      this.action = a[`action`];
    });
  }

  evaluateUser(data: FormGroup): string[] {
    this.formSubmitted = true;
    return this.validationService.evaluateUser(data);
  }
  loginFailed = false;
  Login(): void {
    const userModel = new UserModel();
    userModel.username = this.loginData.controls[`userName`].value;
    userModel.password = this.loginData.controls[`password`].value;
    const auth = this.authService.authenticate(userModel.username, userModel.password);
    if (auth) {
      this.loginFailed = false;
      this.router.navigateByUrl('user').then();
    }
    else {
      this.loginFailed = true;
    }
  }
  checkPassword(): boolean {
    console.log(this.registerData.controls[`password`] + ' ' + this.registerData.controls[`ConfirmPassword`]);
    return !(this.registerData.controls[`password`] === this.registerData.controls[`ConfirmPassword`]);
  }
  Register(): void {
    console.log(this.registerData);
  }

  submitForm(form: FormGroup): void {
    console.log(this.action);
    if (this.loginData.valid) {
      this.authService.get();
      if (this.action === 'login') {
        this.Login();
      } else if (this.action === 'register' && this.checkPassword()) {
        this.Register();
      }
    } else {
      console.log('validate' + ' ' + form);
      this.evaluateUser(form);
    }

  }

}

