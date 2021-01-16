import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {CategoryModel, ProductCompany} from '../../shared/Product.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-product-fliter',
  templateUrl: './product-fliter.component.html',
  styleUrls: ['./product-fliter.component.css']
})
export class ProductFliterComponent implements OnInit {
  categoryList: CategoryModel[];
  CompanyList: ProductCompany[];
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getAllCategories().pipe(first())
      .subscribe(value => this.categoryList = value);
    this.sharedService.getAllCompanies().pipe(first())
      .subscribe(value => this.CompanyList = value);
  }

  onSearch(company?: number, category?: number): void {
    console.log(company + ' ' + category);
  }
}
