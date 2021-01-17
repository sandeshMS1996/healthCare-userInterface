import { Component, OnInit } from '@angular/core';
import {ProductModel} from '../../shared/Product.model';
import {first} from 'rxjs/operators';
import {SharedService} from '../../shared/shared.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  imageurl = environment.resourceServerURl;
  emptyList = false;
  productList: ProductModel[] = [];
  constructor(private sharedService: SharedService) { }
  ngOnInit(): void {
    this.sharedService.getAllProducts().pipe(first())
      .subscribe(value => {
        this.productList = value;
        if ( this.productList.length === 0) {
          this.emptyList = true;
        }
      });
  }

}
