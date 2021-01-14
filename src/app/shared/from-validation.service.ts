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
       // console.log(loginData.controls[a]);
        this.updateErrorMessage(loginData.controls[a].errors, errors, a);
      }
    });
    return errors;
  }
  public updateErrorMessage(controls: any, errors: string[], a: string): void {
    console.log(controls);
    if (controls?.required) {
      errors.push(`${a} is required`.toLocaleLowerCase());
    }
    else if (controls?.minlength) {
      errors.push(`${a} should be at least ${controls[`minlength`].requiredLength} characters long`.toLocaleLowerCase());
    } else if (controls?.email) {
      errors.push('Invalid Email');
    } else if (controls?.noRep) {
      errors.push('password error');
    }
  }
}
