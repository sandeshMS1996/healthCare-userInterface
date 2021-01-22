import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SharedService} from '../../shared/shared.service';
import {CategoryModel, ProductCompany} from '../../shared/Product.model';
import {first} from 'rxjs/operators';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  banner = '';
  success: boolean;
  submitted = false;
  createdCategory = new CategoryModel();
  companies: ProductCompany[] = [];
  categoryTemplate = new FormGroup({
    name: new FormControl(),
    discount: new FormControl(),
    productCompanyList: new FormControl()
  });
  constructor(private sharedservice: SharedService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.sharedservice.getAllCompanies().pipe(first())
      .subscribe(value => {
        this.companies = value;
      });
  }

  submitForm(): void {
    this.submitted = true;
    if (this.categoryTemplate.valid) {
      this.createdCategory = this.categoryTemplate.value;
      this.categoryTemplate.reset();
      this.adminService.addNewCategory(this.createdCategory).pipe(first())
        .subscribe((value: CategoryModel) => {
          this.success = true;
          this.banner = 'Category ' + value.name + ' has been added successfully';
          this.submitted = false;
          console.log(value);
        }, error => {
          this.banner = 'New Category Could not be added';
          this.success = false;
          this.submitted = false;
          this.createdCategory = null;
          console.log(error);
        });
    }
  }

  setId(id: number): void {
  }
}
