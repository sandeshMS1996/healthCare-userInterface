import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFliterComponent } from './product-fliter.component';

describe('ProductFliterComponent', () => {
  let component: ProductFliterComponent;
  let fixture: ComponentFixture<ProductFliterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFliterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFliterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
