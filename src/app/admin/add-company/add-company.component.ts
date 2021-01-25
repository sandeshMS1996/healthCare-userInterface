import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryModel, ProductCompany} from '../../shared/Product.model';
import {AdminService} from '../admin.service';
import {first} from 'rxjs/operators';
import {FromValidationService} from '../../shared/from-validation.service';
import {SharedService} from '../../shared/shared.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  banner = '';
  flag = false;
  company =  new ProductCompany();
  success: boolean;
  submitted = false;
  categories: CategoryModel[] = [];
  companyTemplate  = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{6,}')]),
    gstnumber: new FormControl('', Validators.required),
    isEnabled: new FormControl(true),
    accountNumber: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    discount: new FormControl(0, [Validators.max(90), Validators.min(0)]),
  });
  constructor(private adminService: AdminService, public evaluationService: FromValidationService,
              private sharedService: SharedService, private titleService: Title) {
    this.titleService.setTitle('NetMeds | Add new Brand');
  }

  ngOnInit(): void {
    this.sharedService.getAllCompanies().pipe(first())
      .subscribe(value => {
        this.categories = value;
      });
  }

  submitForm(): void {
    if (this.companyTemplate.valid) {
      this.submitted = true;
      this.company = this.companyTemplate.value;
      this.companyTemplate.reset();
      console.log(JSON.stringify(this.company));
      this.adminService.addNewCompany(this.company)
        .pipe(first()).subscribe((value: ProductCompany) => {
          this.banner = 'Company ' + value.name + ' has been added successfully';
          this.success = true;
          this.submitted = false;
      }, error => {
          this.banner = 'Company could not be added';
          this.success = false;
          this.submitted = false;
      });
  } else {
      this.flag = true;
    }

}
}
