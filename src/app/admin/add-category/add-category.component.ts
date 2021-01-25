import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../shared/shared.service';
import {CategoryModel, ProductCompany} from '../../shared/Product.model';
import {first} from 'rxjs/operators';
import {AdminService} from '../admin.service';
import {FromValidationService} from '../../shared/from-validation.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  banner = '';
  success: boolean;
  submitted = false;
  flag = false;
  createdCategory = new CategoryModel();
  companies: ProductCompany[] = [];
  categoryTemplate = new FormGroup({
    name: new FormControl('', Validators.pattern('[a-zA-Z]{6,}')),
    discount: new FormControl(0, [Validators.max(90), Validators.min(0)]),
  });
  constructor(private sharedservice: SharedService, private adminService: AdminService,
              public evalService: FromValidationService, private titleService: Title) {
    this.titleService.setTitle('NetMeds | Add new Category');
  }

  ngOnInit(): void {
    this.sharedservice.getAllCompanies().pipe(first())
      .subscribe(value => {
        this.companies = value;
      });
  }

  submitForm(): void {
    this.flag = true;
    if (this.categoryTemplate.valid) {
      this.submitted = true;
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
    }else {
      console.log(this.categoryTemplate);
    }
  }

  setId(id: number): void {
  }
}
