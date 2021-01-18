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
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  onSearch(company?: number, category?: number): void {
    console.log(company + ' ' + category);
  }
}
