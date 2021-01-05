import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {FromValidationService} from '../from-validation.service';
import {UserModel} from '../User.model';
import {AppAuthenticationService} from '../app-authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private validationService: FromValidationService,
              private authService: AppAuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    console.log('login component');
  }
  loginData = new FormGroup({
    userName: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(5)])),
    password: new FormControl('', Validators.compose(
      [Validators.required]
    ))
  });
  user: UserModel;
  passwordValidator: false;
  loading = false;
  registerData = new FormGroup({
    firstname: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(5)])),
    lastname: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(3)])),
    email: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(6), Validators.email])),
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
  loginFailed = null;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(a => {
      this.action = a[`action`];
    });
    this.user = this.authService.getCurrentUser();
  }

  evaluateUser(data: FormGroup): string[] {
    this.formSubmitted = true;
    return this.validationService.evaluateUser(data);
  }
  Login(): void {
    const userModel = new UserModel();
    userModel.username = this.loginData.controls[`userName`].value;
    userModel.password = this.loginData.controls[`password`].value;
    this.authService
      .authenticate(userModel.username, userModel.password)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['user']).then();
        this.loading = false;
        this.loginFailed = null;
      }, error => {
        console.log(error);
        this.loading = false;
        if (error.status === 400) {
          this.loginFailed = 'Incorrect Username or password';
        }
      });
  }
  Register(): void {
    console.log(this.registerData);
  }

  submitForm(form: FormGroup): void {
    console.log(this.action);
    if (this.loginData.valid) {
      if (this.action === 'login') {
        this.loading = true;
        this.Login();
      } else if (this.action === 'register') {
        this.Register();
      }
    } else {
      console.log('validate' + ' ' + form);
      this.evaluateUser(form);
    }

  }

}

