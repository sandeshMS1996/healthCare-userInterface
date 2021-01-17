import {ProductModel} from '../shared/Product.model';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

export class CartModel {
  product: ProductModel;
  quantity: number;

  constructor() {
    this.product = new ProductModel();
  }
}
