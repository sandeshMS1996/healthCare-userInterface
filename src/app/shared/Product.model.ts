import * as buffer from 'buffer';
import {FormGroup} from '@angular/forms';

export class ProductModel {
  discount: number;
  imageName: any;
  productDescription: ProductDescription;
  dateAdded: any;
  category: CategoryModel;
  productCompany: ProductCompany;
  constructor(public id?: number, public name?: string, public price?: number,  category?: CategoryModel,
              public description?: string, public stock?: number,
              public notDisabled?: boolean, image?: any,
              dateAdded?: any, productDescription?: ProductDescription,
              discount?: number, productCompany?: ProductCompany) {
    this.productCompany = productCompany;
    this.discount = discount;
    this.category = category;
    this.imageName = image;
    this.dateAdded = dateAdded;
    this.productDescription = productDescription;
  }
}

export class CategoryModel {
  activeCategory: boolean;
  discount: number;
  constructor(public id?: number, public name?: string, activeCategory?: boolean, discount?: number ) {
    this.activeCategory = activeCategory;
    this.discount = discount;
  }
}

export class ProductCompany {
  contactNumber: number;
  accountNumber: number;
  discount: number;
  constructor(public id?: number, public name?: string, public gstnumber?: string, accountNumber?: number,
              contactNumber?: number, discount?: number) {
    this.contactNumber = contactNumber;
    this.accountNumber = accountNumber;
    this.discount = discount;
  }
}
export class ProductDescription {
  id: number;
  composition: string[];
  doseForm: DoseForm;
}

export enum DoseForm {
  TABLET = 0 , LOTION= 1, ORAL = 2 , OPHTHALMIC= 3 , INHALATION = 4
}
