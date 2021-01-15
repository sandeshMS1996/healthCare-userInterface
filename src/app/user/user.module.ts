import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component';
import {HeaderComponent} from '../shared/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {RouteGuardService} from '../shared/route-guard.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFliterComponent } from './product-fliter/product-fliter.component';

const routing = RouterModule.forChild([
  { path: '', component: UserComponent, children: [
      {path: 'products', component: ProductListComponent}
    ]},
]);
@NgModule({
  declarations: [UserComponent, ProductListComponent, ProductFliterComponent],
  imports: [
    CommonModule, SharedModule, routing
  ]
})
export class UserModule { }
