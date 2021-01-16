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
import {ProductListComponent} from '../user/product-list/product-list.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddCategoryComponent } from './add-category/add-category.component';


const routing = RouterModule.forChild([
  { path: 'admin', component: AdminComponent,
  children: [
    { path: 'product/:id/edit', component: AddProductComponent},
    { path: 'product/new', component: AddProductComponent},
    { path: 'products', component: ProductListComponent},
    { path: 'add-new-company', component: AddCompanyComponent},
    { path: 'add-new-category', component: AddCategoryComponent}
  ]}
]);
@NgModule({
  declarations: [AdminComponent, AddProductComponent, AddCompanyComponent, AddCategoryComponent],
  imports: [
    CommonModule, SharedModule, routing, ReactiveFormsModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
