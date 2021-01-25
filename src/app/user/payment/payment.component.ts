import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {first} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  loading = true;
  shippingCharge: number;
  totalPrice: number;
  success = false;
  paymentAttempted = false;
  constructor(public cartService: CartService, private titleService: Title) {
    this.titleService.setTitle('NetMeds | Payment GateWay');
  }

  ngOnInit(): void {
    this.cartService.getTotalCostFromServer().pipe(first())
      .subscribe(value => {
        this.loading = false;
        this.totalPrice = value;
        console.log(value);
      });
    this.shippingCharge = Math.round(2000 / this.cartService.getTotalPrice());
  }

  makePayment(totalPrice: number): void {
    this.paymentAttempted = true;
    this.loading = true;
    this.cartService.purchase(totalPrice).pipe(first())
      .subscribe((value: boolean) => {
        this.loading = false;
        this.success = value;
      }, error => {
        this.loading = false;
        this.success = false;
      });
  }
}
