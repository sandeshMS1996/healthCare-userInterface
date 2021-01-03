import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../RoutesModule';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '../login/login.component';
import {HeaderComponent} from '../header/header.component';
import {HomeComponent} from '../home/home.component';
import {RouteGuardService} from '../route-guard.service';
import {AppAuthenticationService} from '../app-authentication.service';
import {FromValidationService} from '../from-validation.service';
import {AdminModule} from '../../admin/admin.module';



@NgModule({
  declarations: [LoginComponent,
    HeaderComponent,
    HomeComponent],
  imports: [
    CommonModule, BrowserModule, AppRoutingModule, RouterModule, ReactiveFormsModule, AdminModule
  ],
  providers: [RouteGuardService, AppAuthenticationService, FromValidationService]
})
export class SharedModule { }
