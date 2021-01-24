import {ProductModel} from '../shared/Product.model';

export class Purchase {
  id: number;
  username: string;
  appliedDiscount: number;
  product: ProductModel;
  count: number;
  cost: number;
  paymentMode = 'UPI';
  constructor(username: string, product: ProductModel,
              count: number,  paymentMode: string) {
    this.username = username;
    this.product = product;
    this.count = count;
    this.paymentMode = paymentMode;
  }
}
