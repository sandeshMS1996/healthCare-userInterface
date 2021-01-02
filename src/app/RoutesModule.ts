import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './shared/login/login.component';
const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: '', component: LoginComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
