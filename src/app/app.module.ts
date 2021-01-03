import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {RouteGuardService} from './shared/route-guard.service';
import {HomeComponent} from './shared/home/home.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: {role: ['ROLE_ADMIN']},
    canActivate: [RouteGuardService]},
  { path: 'user', /*component: UserComponent,*/
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    data: {role: ['ROLE_USER']},
    /*canActivate: [RouteGuardService]*/ },
  { path: '', component: HomeComponent},
  { path: '**', component: HomeComponent}];
@NgModule({
  declarations: [AppComponent
  ],
  imports: [
    SharedModule, UserModule, AdminModule, RouterModule.forRoot(routes), BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
