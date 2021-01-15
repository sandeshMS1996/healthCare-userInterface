import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
}
