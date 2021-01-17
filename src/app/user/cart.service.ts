import { Injectable } from '@angular/core';
import {CartModel} from './cart.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartModel[] = [];
  private price: number;
  constructor() {
    this.retrieveCart();
  }
  addToCart(newItem: CartModel, quantity: number): void {
      const index = this.cart?.findIndex(value => value.product.id === newItem.product.id);
      console.log('index' + index);
      if (index > -1) {
        this.cart[index].quantity += quantity;
      } else {
        newItem.quantity = quantity;
        this.cart.push(newItem);
      }
      console.log(JSON.stringify(this.cart));
      this.storeCart();
  }
  private storeCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.retrieveCart();
  }
  private retrieveCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    if (!this.cart) {
      this.cart = [];
    }
  }
  public getQuantityByproductId(id: number): number {
    const index = this.cart.findIndex(value => value.product.id === id);
    if (index > -1) {
      return this.cart[index].quantity;
    }
    return 0;
  }
}
