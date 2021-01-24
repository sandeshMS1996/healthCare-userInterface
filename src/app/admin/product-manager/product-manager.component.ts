import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {SharedService} from '../../shared/shared.service';
import {CartService} from '../../user/cart.service';
import {UserService} from '../../user/user.service';
import {CategoryModel, ProductCompany, ProductModel} from '../../shared/Product.model';
import {environment} from '../../../environments/environment';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {
  imageurl = environment.resourceServerURl;
  productList: ProductModel[] = [];
  categoryList: CategoryModel[];
  CompanyList: ProductCompany[];
  emptyList: boolean;
  updateDiscountMode = false;
  selectedProduct: ProductModel;
  updateMode: string;
  discount: number;

  constructor(public sharedService: SharedService, public cartService: CartService, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.sharedService.getAllCategories().pipe(first())
      .subscribe(value => this.categoryList = value);
    this.sharedService.getAllCompanies().pipe(first())
      .subscribe(value => this.CompanyList = value);
    this.getProducts();
  }

  getProducts(): void {
    this.sharedService.getAllProducts().pipe(first())
      .subscribe(value => {
        this.productList = value;
        if (this.productList.length === 0) {
          this.emptyList = true;
        }
      });
  }

  updateSelectedProduct(p: ProductModel): void {
    this.selectedProduct = p;
  }

  updateSelectionMode(avaialabality: string): void {
    this.updateMode = avaialabality;
  }

  updateDiscount(): void {
    this.adminService.updateProductDiscount(this.selectedProduct.id, this.discount)
      .pipe(first()).subscribe((value: ProductModel) => {
      if (value) {
        const index = this.productList.findIndex(v => v.id === value.id);
        if (index > -1) {
          this.productList[index] = value;
        }
      }
    });
  }

  updateAvailability(): void {
    console.log(this.selectedProduct.notDisabled);
    this.adminService.updateAvailability(this.selectedProduct)
      .pipe(first()).subscribe((value: ProductModel) => {
      if (value) {
        const index = this.productList.findIndex(v => v.id === value.id);
        if (index > -1) {
          this.productList[index] = value;
        }
      }
    });
  }
}
