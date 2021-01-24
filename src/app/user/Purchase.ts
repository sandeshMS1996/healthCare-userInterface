import {ProductModel} from '../shared/Product.model';

export class Purchase {
  id: number;
  username: string;
  appliedDiscount: number;
  product: ProductModel;
  count: number;
  cost: number;
  paymentMode = 'UPI';
  constructor(username: string, appliedDiscount: number, product: ProductModel,
              count: number, cost: number, paymentMode: string) {
    this.username = username;
    this.appliedDiscount = appliedDiscount;
    this.product = product;
    this.count = count;
    this.cost = cost;
    this.paymentMode = paymentMode;
  }
}
