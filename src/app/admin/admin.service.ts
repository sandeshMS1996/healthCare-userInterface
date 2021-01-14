import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductModel} from '../shared/Product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  public AddNewProduct(product: ProductModel): Observable<any> {
    console.log(JSON.stringify(product).slice( ));
    return this.httpClient.post('http://localhost:8081/api/admin/add-new-product', JSON.stringify(product),
      {
        headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .pipe(map( value => {
        console.log(value);
        return value;
      }
      )) ;
  }
  public getProductById(productId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8081/api/customer/product/' + productId)
      .pipe(map( value => {
        console.log(value);
        return value;
      }
      )) ;
  }
}
