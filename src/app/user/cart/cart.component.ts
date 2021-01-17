import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CartService} from '../cart.service';
import {CartModel} from '../cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartModel[];
  imageurl = environment.resourceServerURl;
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

}
