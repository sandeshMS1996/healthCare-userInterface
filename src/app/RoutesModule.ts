import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './shared/login/login.component';
import {HomeComponent} from './shared/home/home.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: '', component: HomeComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
