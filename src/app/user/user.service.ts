import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductCompany} from '../shared/Product.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  public getAllProducts(): Observable<any> {
    return this.httpClient.get('http://localhost:8081/api/customer/all-products')
      .pipe(map(value => {
        return value;
      }));
  }
  public getProductsByCompany(id: number): Observable<any> {
    const company = new ProductCompany(id);
    return this.httpClient.post(environment.resourceServerURl + 'api/customer/get-products-by-company',
      JSON.stringify(company), {headers: {'content-type': 'application/json'}})
      .pipe(map(value => {
        return value;
      }));
  }

}
