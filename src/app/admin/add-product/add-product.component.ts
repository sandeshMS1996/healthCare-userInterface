import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, RouterModule, Routes} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryModel, DoseForm, ProductCompany, ProductModel} from '../../shared/Product.model';
import {FromValidationService} from '../../shared/from-validation.service';
import {AdminService} from '../admin.service';
import {first} from 'rxjs/operators';
import {verifySupportedTypeScriptVersion} from '@angular/compiler-cli/src/typescript_support';
import {SharedService} from '../../shared/shared.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  flag = false;
  success = false;
  submitted = false;
  product =  new ProductModel();
  Banner: string;
  id: number;
  selectedImage: any;
  dosageForm = Object.keys(DoseForm).filter(value => isNaN(Number(value)));
  registerData = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(5)])),
    price: new FormControl('', Validators.compose([Validators.required])),
    stock: new FormControl('', Validators.min(0)),
    description: new FormControl('', Validators.minLength(20)),
    category: new FormGroup({
      id: new FormControl()
    }),
    notDisabled: new FormControl(''),
    dateAdded: new FormControl(''),
    imageName: new FormControl(),
    discount: new FormControl(0),
    productCompany: new FormGroup({
      id: new FormControl()
    }),
    productDescription: new FormGroup({
      id: new FormControl(),
      composition: new FormControl(),
      doseForm: new FormControl()
    })
  });
  loading =  false;
  categoryList: CategoryModel[] = [];
  companies: ProductCompany[] = [];
  constructor(private activeRoute: ActivatedRoute,
              public evaluationService: FromValidationService,
              private adminService: AdminService,
              private sharedService: SharedService
              ) {
    console.log(this.dosageForm);
  }

  ngOnInit(): void {
    this.sharedService.getAllCategories().pipe(first())
      .subscribe((value: CategoryModel[]) => {
        if (value?.length  === 0) {
          console.log('disabling form group');
          this.registerData.disable();
          return;
        }
        this.categoryList = value;
      });
    this.activeRoute.params.subscribe((param: Params) => {
      this.id = + param[`id`];
      if (this.id) {
        this.adminService.getProductById(this.id).pipe(first())
          .subscribe(value => {
            this.product = value;
            this.Banner = 'Edit Product: ' + this.product.name;
            this.registerData.patchValue(this.product);
            this.registerData.controls[`notDisabled`].setValue(this.product.notDisabled, {onlySelf: true});
          });
      } else {
        this.Banner = 'Add new Product:';
      }
    });
  }

  submitForm(): void {
      if (this.registerData.valid && this.selectedImage) {
        this.submitted = true;
        this.loading = true;
        console.log(this.registerData);
        this.product = this.registerData.value;
        console.log(this.registerData);
        /*const c = new CategoryModel(1/!*this.product.category.id*!/);
        this.product.category = c;
        const p = new ProductCompany(8/!*this.product.productCompany.id*!/);
        this.product.productCompany = p;*/
        console.log(JSON.stringify(this.product));
        this.adminService.AddNewProduct(this.product, this.selectedImage)
          .pipe(first()).subscribe(value => {
            this.submitted = false;
            console.log(value);
            this.success = true;
          },
          error => {
            console.log(error);
            this.success = false;
            this.submitted = false;
          });
      } else {
        this.flag = true;
      }
  }

  onSlectImage(event): void {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }
  getCompaies(id: any): void {
    this.registerData.controls[`productDescription`].reset();
    console.log('calling change' + id);
    this.adminService.getCompanyByCategoryId(id).pipe(first())
      .subscribe((value: ProductCompany[]) => {
        console.log(value);
        this.companies = value;
      });
  }

  conertToArray(): void {
    // @ts-ignore
    const data = this.registerData.controls[`productDescription`].controls[`composition`].value;
    // @ts-ignore
    this.registerData.controls[`productDescription`].controls[`composition`].setValue(data.split(','));
  }
}
