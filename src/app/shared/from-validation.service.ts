import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FromValidationService {
  constructor() { }
  public evaluateUser(loginData: FormGroup): string[] {
    const errors: string[] = [];
    Object.keys(loginData.controls).forEach( a => {
      if (loginData.controls[a] != null) {
        // console.log(this.loginData.controls[a]);
        this.updateErrorMessage(loginData.controls[a].errors, errors, a);
      }
    });
    console.log(errors);
    return errors;
  }
  public updateErrorMessage(controls: any, errors: string[], a: string): void {
    if (controls?.required) {
      errors.push(`${a} is required`.toLocaleLowerCase());
    }
    else if (controls?.minlength) {
      console.log('minlength');
      errors.push(`${a} should be at least ${controls[`minlength`].requiredLength} characters long`.toLocaleLowerCase());
    }
  }
}
