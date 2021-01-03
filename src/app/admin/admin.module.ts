import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {HeaderComponent} from '../shared/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {UserComponent} from '../user/user.component';
import {RouteGuardService} from '../shared/route-guard.service';


const routing = RouterModule.forChild([
  { path: '', component: AdminComponent,
    canActivate: [RouteGuardService] },
]);
@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule, SharedModule, routing
  ]
})
export class AdminModule { }
