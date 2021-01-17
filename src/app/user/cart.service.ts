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
    this.calculateTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('price', this.price.toString());
    this.retrieveCart();
  }
  private retrieveCart(): void {
    this.price = + localStorage.getItem('price');
    this.cart = JSON.parse(localStorage.getItem('cart'));
    if (!this.cart) {
      this.cart = [];
      this.price = 0;
    }
  }
  getTotalPrice(): number {
    return this.price;
  }
  public getQuantityByproductId(id: number): number {
    const index = this.cart.findIndex(value => value.product.id === id);
    if (index > -1) {
      return this.cart[index].quantity;
    }
    return 0;
  }
  public getCartSize(): number {
    return this.cart.reduce((previousValue, currentValue) =>
      previousValue + currentValue.quantity, 0);
  }
  public getCart(): CartModel[] {
    return this.cart;
  }
  public removeFromCart(id: number): void {
    const index = this.cart.findIndex(value => value.product.id === id);
    if (index >= -1) {
      this.cart.splice(index, 1);
      this.storeCart();
      this.calculateTotalPrice();
    }
  }
  private calculateTotalPrice(): void {
    let price1 = 0;
    for (const c of this.cart) {
       price1 = price1 + c.quantity * c.product.price;
       console.log('cal: ' +  c.product.name + ' ' + c.product.price + ' ' + c.quantity + ' =>' + price1);
    }
    this.price = price1;
    console.log(this.price);
  }

}
