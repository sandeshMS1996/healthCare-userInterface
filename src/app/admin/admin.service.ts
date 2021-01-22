import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {CategoryModel, ProductCompany, ProductModel} from '../shared/Product.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  public AddNewProduct(product: ProductModel, selectedImage: any): Observable<any> {
    product.dateAdded = undefined;
    const formDate =  new FormData();
    formDate.append( 'data', JSON.stringify(product));
    formDate.append( 'file', selectedImage);
    console.log(formDate);
    return this.httpClient.post('http://localhost:8081/api/admin/add-new-product', formDate,
      {
        headers: {enctype: 'multipart/form-data'}})
      .pipe(map( value => {
        console.log(value);
        return value;
      }
      )) ;
  }
  public getProductById(productId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8081/api/customer/product/' + productId)
      .pipe(map( value => {
        return value;
      }
      )) ;
  }
  public addNewCompany(company: ProductCompany): Observable<any> {
   return this.httpClient.post(environment.resourceServerURl + 'api/admin/add-new-company',
     JSON.stringify(company), {
      headers: {'content-type': 'application/json'}})
     .pipe(map(value => {
       console.log(value);
       return value;
     }));
  }
  public addNewCategory(category: CategoryModel): Observable<any> {
    console.log(JSON.stringify(category));
    return this.httpClient.post(environment.resourceServerURl + 'api/admin/add-new-category',
      JSON.stringify(category), { headers: {'content-type': 'application/json'}}
    ).pipe(map(value => {
      return value;
    }));
  }
  public getCompanyByCategoryId(id: number): Observable<any> {
    return this.httpClient.get(environment.resourceServerURl + 'api/customer/get-category-by-id/' + id)
      .pipe(map(value => {
        return value;
      }));
  }
  public updateProductDiscount(productId: number, updatedDiscount: number): Observable<any> {
    return this.httpClient.
    post(environment.resourceServerURl + 'api/admin/update-product-discount/' +
      productId + '?updated-discount=' + updatedDiscount, '')
      .pipe(map(value => {
        return value;
      }));
  }
}
