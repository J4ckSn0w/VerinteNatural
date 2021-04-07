import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeControlComponent } from './product-type-control.component';

describe('ProductTypeControlComponent', () => {
  let component: ProductTypeControlComponent;
  let fixture: ComponentFixture<ProductTypeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
