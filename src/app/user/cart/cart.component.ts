import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CartService} from '../cart.service';
import {CartModel} from '../cart.model';
import {SharedService} from '../../shared/shared.service';
import {first} from 'rxjs/operators';
import {ProductModel} from '../../shared/Product.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPrice: number;
  loading = true;
  cart: CartModel[];
  newCart: CartModel[] = [];
  imageurl = environment.resourceServerURl;
  errors: string[] = [];
  constructor(public cartService: CartService, private sharedService: SharedService, private titleService: Title) {
    this.titleService.setTitle('NetMeds | cart');
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    if ( this.cart.length <= 0) {
      this.loading = false;
    }
    for (const cartElement of this.cart) {
      this.sharedService.getProductById(cartElement.product.id)
        .pipe(first()).subscribe((product: ProductModel) => {
          if (product) {
            const cartModel = new CartModel();
            cartModel.product = product;
            if (product.stock < cartModel.quantity) {
              this.errors.push(`Only ${product.stock}  left in stock for product ${product.name} `);
              cartModel.quantity = product.stock;
            }
            if (!product.notDisabled) {
              this.errors.push(`Product ${product.name} is disabled`);
              cartModel.quantity = 0;
            } else {
              cartModel.quantity = cartElement.quantity;
            }
            console.log(cartModel);
            this.newCart.push(cartModel);
            console.log(this.cart.length + ' ==>' +  this.newCart.length);
            if (this.cart.length === this.newCart.length) {
              console.log('calculating price');
              this.cartService.updateCart(this.newCart);
              this.cartService.getTotalCostFromServer().pipe(first())
                .subscribe(value => {
                  this.totalPrice = value;
                  this.loading = false;
                  console.log(value);
                });
            }
          }
      });
    }
  }
  updateCart(quantity: number, cart: CartModel): void {
    cart.quantity  = cart.quantity + quantity;
    this.cartService.addToCart(cart);
  }

}
