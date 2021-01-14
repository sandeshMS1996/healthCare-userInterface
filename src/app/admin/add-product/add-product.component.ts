import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, RouterModule, Routes} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryModel, ProductCompany, ProductModel} from '../../shared/Product.model';
import {FromValidationService} from '../../shared/from-validation.service';
import {AdminService} from '../admin.service';
import {first} from 'rxjs/operators';
import {verifySupportedTypeScriptVersion} from '@angular/compiler-cli/src/typescript_support';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product =  new ProductModel();
  Banner: string;
  id: number;
  actioned: boolean;
  selectedImage: any;
  registerData = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(5)])),
    price: new FormControl('', Validators.compose([Validators.required])),
    stock: new FormControl(),
    description: new FormControl(''),
    category: new FormControl(''),
    productCompany: new FormControl(''),
    notDisabled: new FormControl(''),
    dateAdded: new FormControl(''),
    imageName: new FormControl()
  });
  loading =  false;
  constructor(private activeRoute: ActivatedRoute,
              private Evaluationservice: FromValidationService,
              private adminService: AdminService
              ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((param: Params) => {
      this.id = + param[`id`];
      if (this.id) {
        this.adminService.getProductById(this.id).pipe(first())
          .subscribe(value => {
            this.product = value;
            console.log(this.product);
            this.Banner = 'Edit Product: ' + this.product.name;
            this.registerData.setValue(this.product);
            this.registerData.controls[`category`].setValue(this.product.category.id, {onlySelf: true});
            this.registerData.controls[`productCompany`].setValue(this.product.productCompany.id, {onlySelf: true});
            this.registerData.controls[`notDisabled`].setValue(this.product.notDisabled, {onlySelf: true});
          });
      } else {
        this.Banner = 'Add new Product:';
      }
    });
  }

  submitForm(registerData: FormGroup): void {
      this.loading = true;
      console.log(this.registerData);
      this.product = this.registerData.value;
      const c = new CategoryModel(1/*this.product.category.id*/);
      this.product.category = c;
      const p = new ProductCompany(8/*this.product.productCompany.id*/);
      this.product.productCompany = p;
      this.adminService.AddNewProduct(this.product, this.selectedImage)
        .pipe(first()).subscribe(value => {
        console.log(value);
        this.actioned = true;
        },
        error => console.log(error));
      this.loading = false;
  }

  onSlectImage(event): void {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }
}