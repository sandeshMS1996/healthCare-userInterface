import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  shippingCharge: number;
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.shippingCharge = Math.round(2000 / this.cartService.getTotalPrice());
  }

}
