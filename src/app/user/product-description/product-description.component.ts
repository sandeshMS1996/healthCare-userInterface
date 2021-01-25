import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductModel} from '../../shared/Product.model';
import {SharedService} from '../../shared/shared.service';
import {first} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {CartService} from '../cart.service';
import {CartModel} from '../cart.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  loading = true;
  imageurl = environment.resourceServerURl;
  productId: number;
  cart = new CartModel();
  product: ProductModel;
  constructor(private ActiveRoute: ActivatedRoute, private sharedService: SharedService,
              public cartService: CartService, private titleService: Title) {
    this.titleService.setTitle('NetMeds | Product');
  }
  ngOnInit(): void {
    this.ActiveRoute.params.subscribe((value: Params) => {
      this.productId = + value[`id`];
      if (this.productId) {
        this.sharedService.getProductById(this.productId).pipe(first())
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe((value: ProductModel) => {
            this.loading = false;
            this.product = value;
            this.cart.product = this.product;
            this.cart.quantity = this.cartService.getQuantityByproductId(this.product.id);
          });
      }
    });
  }
  updatecart(quantity: number): void {
    this.cart.quantity += quantity;
    /*this.cartService.addToCart(this.cart, quantity);*/
  }
  getCart(): void {
  }

}
