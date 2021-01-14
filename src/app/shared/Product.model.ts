export class ProductModel {
  imageName: any;
  dateAdded: any;
  constructor(public id?: number, public name?: string, public price?: number, public category?: CategoryModel,
              public description?: string, public stock?: number,
              public productCompany?: ProductCompany, public notDisabled?: boolean, image?: any,
              dateAdded?: any) {
    this.imageName = image;
    this.dateAdded = dateAdded;
  }
}

export class CategoryModel {
  activeCategory: boolean;
  name: string;
  constructor(public id?: number, name?: string, activeCategory?: boolean) {
    this.activeCategory = activeCategory;
    this.name = name;
  }
}

export class ProductCompany {
  constructor(public id?: number, public name?: string) {
  }
}
