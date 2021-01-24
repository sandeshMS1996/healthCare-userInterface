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
  priceSortltoh = false;
  loading = true;
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
      .subscribe((value: ProductModel[]) => {
        this.loading = false;
        this.productList = value.filter(value1 => value1.notDisabled);
        if ( this.productList.length === 0) {
          this.emptyList = true;
        }
      });
  }
  onSearch(id: number): void {
  }
  searchByCompany(id: number): void {
    this.loading = true;
    this.productList = [];
    this.userService.getProductsByCompany(id).pipe(first())
      .subscribe((value: ProductModel[]) => {
        this.loading = false;
        this.productList = value;
      });
  }
  searchByCategory(id: number): void {
    this.loading = true;
    this.productList = [];
    this.userService.getProductsByCategory(id).pipe(first())
      .subscribe((value: ProductModel[]) => {
        this.loading = false;
        this.productList = value;
      });
  }
  getDiscountedPrice(price: number, discount): string {
    return Math.round(((100 - discount) / 100) * price).toFixed(2);
  }
  filterByPrice(x: string): void {
    if (x === 'price') {
      this.priceSortltoh ?
        this.productList.sort((a, b) => a.price - b.price) :
        this.productList.sort((a, b) => b.price - a.price);
      this.priceSortltoh = !this.priceSortltoh;
    } else {
      console.log(x);
      // @ts-ignore
      this.productList.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
  }
}
