import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {RouteGuardService} from './route-guard.service';


@NgModule({
  declarations: [LoginComponent,
    HomeComponent, HeaderComponent],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  providers: [RouteGuardService/*, AppAuthenticationService, FromValidationService*/],
  exports: [HeaderComponent]
})
export class SharedModule { }
