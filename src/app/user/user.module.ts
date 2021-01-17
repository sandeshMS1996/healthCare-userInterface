import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component';
import {HeaderComponent} from '../shared/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {RouteGuardService} from '../shared/route-guard.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFliterComponent } from './product-fliter/product-fliter.component';
import { CartComponent } from './cart/cart.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { HeaderComponent } from './header/header.component';

const routing = RouterModule.forChild([
  { path: 'products', component: UserComponent},
  {path: 'product/:id', component: ProductDescriptionComponent}
]);
@NgModule({
  declarations: [UserComponent, ProductListComponent, ProductFliterComponent, CartComponent, ProductDescriptionComponent, HeaderComponent],
  imports: [
    CommonModule, SharedModule, routing
  ],
  exports: [ProductListComponent]
})
export class UserModule { }
