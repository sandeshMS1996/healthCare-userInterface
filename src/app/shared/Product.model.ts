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
  name: string;
  productCompanyList: ProductCompany[];
  constructor(public id?: number, name?: string, activeCategory?: boolean, productCompanyList?: ProductCompany[]) {
    this.activeCategory = activeCategory;
    this.productCompanyList = productCompanyList;
    this.name = name;
  }
}

export class ProductCompany {
  constructor(public id?: number, public name?: string, public gstnumber?: string) {
  }
}
