import * as buffer from 'buffer';

export class ProductModel {
  imageName: any;
  dateAdded: any;
  category: CategoryModel;
  constructor(public id?: number, public name?: string, public price?: number,  category?: CategoryModel,
              public description?: string, public stock?: number,
              public notDisabled?: boolean, image?: any,
              dateAdded?: any) {
    this.category = category;
    this.imageName = image;
    this.dateAdded = dateAdded;
  }
}

export class CategoryModel {
  activeCategory: boolean;
  productCompanyList: ProductCompany[];
  constructor(public id?: number, public name?: string, activeCategory?: boolean,
              productCompanyList?: ProductCompany[], ) {
    this.activeCategory = activeCategory;
    this.productCompanyList = productCompanyList;
  }
}

export class ProductCompany {
  contactNumber: number;
  accountNumber: number;
  constructor(public id?: number, public name?: string, public gstnumber?: string, accountNumber?: number,
              contactNumber?: number) {
    this.contactNumber = contactNumber;
    this.accountNumber = accountNumber;
  }
}
