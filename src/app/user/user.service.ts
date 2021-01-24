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
    return this.httpClient.get(environment.resourceServerURl + 'api/customer/all-products')
      .pipe(map(value => {
        return value;
      }));
  }
  public getProductsByCompany(id: number): Observable<any> {
    const company = new ProductCompany(id);
    return this.httpClient.post(environment.resourceServerURl + 'api/customer/filter?companyId=' + id, '')
      .pipe(map(value => {
        return value;
      }));
  }
  public getProductsByCategory(id: number): Observable<any> {
    const company = new ProductCompany(id);
    return this.httpClient.post(environment.resourceServerURl + 'api/customer/filter?categoryId=' + id, '')
      .pipe(map(value => {
        return value;
      }));
  }

}
