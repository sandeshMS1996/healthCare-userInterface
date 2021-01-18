import { Component, OnInit } from '@angular/core';
import {CategoryModel, ProductCompany, ProductModel} from '../../shared/Product.model';
import {first} from 'rxjs/operators';
import {SharedService} from '../../shared/shared.service';
import {environment} from '../../../environments/environment';
import {CartService} from '../cart.service';
import {CartModel} from '../cart.model';
import {UserService} from '../user.service';
import {CartComponent} from '../cart/cart.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  imageurl = environment.resourceServerURl;
  emptyList = false;
  productList: ProductModel[] = [];
  categoryList: CategoryModel[];
  CompanyList: ProductCompany[];
  constructor(private sharedService: SharedService, public cartService: CartService, private userService: UserService) { }
  ngOnInit(): void {
    this.sharedService.getAllCategories().pipe(first())
      .subscribe(value => this.categoryList = value);
    this.sharedService.getAllCompanies().pipe(first())
      .subscribe(value => this.CompanyList = value);
    this.sharedService.getAllProducts().pipe(first())
      .subscribe(value => {
        this.productList = value;
        if ( this.productList.length === 0) {
          this.emptyList = true;
        }
      });
  }

  addToCart(i: ProductModel): void {
    const model = new CartModel();
    model.product = i;
    this.cartService.addToCart(model, 1);
  }
  onSearch(id: number): void {
  }

  searchByCompany(id: number): void {
    this.productList = [];
    this.userService.getProductsByCompany(id).pipe(first())
      .subscribe(value => {
        this.productList = value;
      });
  }
}
