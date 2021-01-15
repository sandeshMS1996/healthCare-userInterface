import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpclient: HttpClient) { }

  public getAllProducts(): Observable<any> {
    return this.httpclient.get('http://localhost:8081/api/customer/all-products')
      .pipe(map(value => {
        return value;
      }));
  }
  public getProductById(productId: number): Observable<any> {
    return this.httpclient.get('http://localhost:8081/api/customer/product/' + productId)
      .pipe(map( value => {
          console.log(value);
          return value;
        }
      )) ;
  }
  public getAllCategories(): Observable<any> {
    return this.httpclient.get(environment.resourceServerURl + 'api/admin/get-all-categories')
      .pipe(map( value => {
          console.log(value);
          return value;
        }
      )) ;
  }
  public getAllCompanies(): Observable<any> {
    return this.httpclient.get(environment.resourceServerURl + 'api/admin/get-all-companies')
      .pipe(map( value => {
          console.log(value);
          return value;
        }
      )) ;
  }
}
