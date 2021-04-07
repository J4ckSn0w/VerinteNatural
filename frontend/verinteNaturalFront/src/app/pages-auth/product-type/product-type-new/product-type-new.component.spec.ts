import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeNewComponent } from './product-type-new.component';

describe('ProductTypeNewComponent', () => {
  let component: ProductTypeNewComponent;
  let fixture: ComponentFixture<ProductTypeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
