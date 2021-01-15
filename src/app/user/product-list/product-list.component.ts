import { Component, OnInit } from '@angular/core';
import {ProductModel} from '../../shared/Product.model';
import {first} from 'rxjs/operators';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: ProductModel[] = [];
  constructor(private sharedService: SharedService) { }
  ngOnInit(): void {
    this.sharedService.getAllProducts().pipe(first())
      .subscribe(value => {
        this.productList = value;
        console.log(value);
      });
  }

}