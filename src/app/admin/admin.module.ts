import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {HeaderComponent} from '../shared/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {UserComponent} from '../user/user.component';
import {RouteGuardService} from '../shared/route-guard.service';
import { AddProductComponent } from './add-product/add-product.component';
import {ReactiveFormsModule} from '@angular/forms';


const routing = RouterModule.forChild([
  { path: '', component: AdminComponent,
  children: [
    { path: 'product/:id/edit', component: AddProductComponent},
    { path: 'product/new', component: AddProductComponent}
  ]}
]);
@NgModule({
  declarations: [AdminComponent, AddProductComponent],
  imports: [
    CommonModule, SharedModule, routing, ReactiveFormsModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
