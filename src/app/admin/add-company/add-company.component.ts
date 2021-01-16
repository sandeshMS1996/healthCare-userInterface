import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductCompany} from '../../shared/Product.model';
import {AdminService} from '../admin.service';
import {first} from 'rxjs/operators';
import {FromValidationService} from '../../shared/from-validation.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  errors: string[] = [];
  company =  new ProductCompany();
  success: boolean;
  submitted = false;
  companyTemplate  = new FormGroup({
    name: new FormControl('', Validators.required),
    gstnumber: new FormControl('', Validators.required),
    isEnabled: new FormControl(true),
    accountNumber: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required)
  });
  constructor(private adminService: AdminService, private evaluationService: FromValidationService) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.companyTemplate.valid) {
      this.submitted = true;
      this.company = this.companyTemplate.value;
      this.companyTemplate.reset();
      console.log(JSON.stringify(this.company));
      this.adminService.addNewCompany(this.company)
        .pipe(first()).subscribe(value => {
          this.errors = [];
          this.company = value;
          this.success = true;
      }, error => {
          this.success = false;
      });
  } else {
        this.errors = this.evaluationService.evaluateUser(this.companyTemplate);
    }

}
}
