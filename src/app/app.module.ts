import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {RouteGuardService} from './shared/route-guard.service';
import {HomeComponent} from './shared/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {JwtInterseptorService} from './shared/jwt-interseptor.service';
import {CartComponent} from './user/cart/cart.component';
const routes: Routes = [
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: {role: ['ROLE_ADMIN']},
    canActivate: [RouteGuardService]},
  { path: 'user', /*component: UserComponent,*/
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    data: {role: ['ROLE_USER', 'ROLE_ADMIN']},
    canActivate: [RouteGuardService] },
  { path: ':action', component: LoginComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'
  }];
@NgModule({
  declarations: [AppComponent
  ],
  imports: [
    SharedModule, UserModule, AdminModule, RouterModule.forRoot(routes), BrowserModule, HttpClientModule
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  entryComponents: [CartComponent]
})
export class AppModule { }
