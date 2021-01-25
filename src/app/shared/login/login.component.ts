import { Component, OnInit } from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FromValidationService} from '../from-validation.service';
import {UserModel} from '../User.model';
import {AppAuthenticationService} from '../app-authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {RegistrationService} from '../registration.service';
import {createUrlResolverWithoutPackagePrefix} from '@angular/compiler';
/*import {forbiddenNameValidator} from '../Password.Custom.validator';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private validationService: FromValidationService,
              private authService: AppAuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private regService: RegistrationService) {
    const currentUser = this.authService.getCurrentUser();
    if ( currentUser ) {
      if (currentUser.role === 'ROLE_USER') {
        this.router.navigateByUrl('user').then();
      } else {
        this.router.navigateByUrl('admin').then();
      }
    }
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
    firstName: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(5)])),
    lastName: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(3)])),
    username: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(6), Validators.email])),
    phoneNumber: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(10)])),
    password: new FormControl('', Validators.compose(
      [Validators.required],
    )),
    ConfirmPassword: new FormControl('', Validators.compose(
      [Validators.required],
    ))
  }, {validators: this.forbiddenNameValidator('password', 'ConfirmPassword')});
  formSubmitted = false;
  action: string;
  loginFailed = null;
  forbiddenNameValidator( cp: string, p: string): ValidatorFn {
    return (group: AbstractControl): {[key: string]: any} | null => {
      const cpass = group.get(cp).value;
      const pass = group.get(p).value;
      if (pass !== cpass) {
        group.get(p).setErrors({noRep: true});
        return  {forbiddenName: {noRep: true}};
      }
      group.get(cp).setErrors(null);
      return null;
    };
  }
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
    this.authService
      .authenticate(this.loginData.controls[`userName`].value, this.loginData.controls[`password`].value)
      .pipe(first())
      .subscribe((currentUser: UserModel) => {
          this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
        if (error.status === 400) {
          this.loginFailed = 'Incorrect Username or password';
        } else {
          this.loginFailed = 'UnExpected Error';
        }
      });
  }
  Register(): void {
    const reg =  {};
    // console.log(this.registerData);
    Object.keys(this.registerData.controls).forEach( key => {
      if (key === 'ConfirmPassword') {
      } else {
        console.log(key);
        reg[key] = this.registerData.controls[key].value;
      }
    });
    console.log(JSON.stringify(reg));
    this.regService.register(reg).pipe(first())
      .subscribe( data => {
        console.log(data);
      }, error => console.log(error));
  }

  submitForm(form: FormGroup): void {
    console.log(form);
    if (form.valid) {
      if (this.action === 'login') {
        this.loading = true;
        this.Login();
      } else if (this.action === 'register') {
        console.log('reg');
        this.Register();
      }
    } else {
      console.log('bug');
      this.evaluateUser(form);
    }

  }
  decideNavigation(): void {
    const currentUser = this.authService.getCurrentUser();
    console.log(currentUser);
  }
}

