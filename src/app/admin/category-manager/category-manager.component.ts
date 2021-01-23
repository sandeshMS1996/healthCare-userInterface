import { Component, OnInit } from '@angular/core';
import {CategoryModel, ProductModel} from '../../shared/Product.model';
import {SharedService} from '../../shared/shared.service';
import {first} from 'rxjs/operators';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {
  banner = '';
  success = false;
  submitted = false;
  categories: CategoryModel[] = [];
  selectedCategory: CategoryModel;
  discount: number;
  constructor(private sharedService: SharedService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.sharedService.getAllCategories().pipe(first()).subscribe((value: CategoryModel[]) => {
      this.categories = value;
    });
  }

  updateSelectedcategory(c: CategoryModel): void {
    this.selectedCategory = c;
  }

  updateDiscount(): void {
    if (this.discount >= 0 && this.discount <= 100) {
      this.submitted = true;
      this.adminService.updateCategoryDiscount(this.selectedCategory.id, this.discount)
        .pipe(first()).subscribe((value: CategoryModel) => {
        if (value) {
          this.success = true;
          this.banner = 'Category Discount has been updated successfully';
          this.submitted = false;
          const index = this.categories.findIndex(v => v.id === value.id);
          if (index > -1) {
            this.categories[index] = value;
          }
        }
      }, error => {
          this.banner = 'category Discount could not be updated';
          this.success = false;
          this.submitted = false;
      });
    }
  }
}
