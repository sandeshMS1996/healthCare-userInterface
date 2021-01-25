import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
  }
  public register(regData: any): Observable<any> {
    console.log('inside register');
    const header = new HttpHeaders();
    return this.httpClient.post(environment.authServerUrl + 'api/user/register',
      JSON.stringify(regData), {
         headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .pipe(map(user => console.log( 'obs' + JSON.stringify(user))));
  }
}
