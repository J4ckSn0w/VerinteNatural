import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeRoutingComponent } from './product-type-routing.component';

describe('ProductTypeRoutingComponent', () => {
  let component: ProductTypeRoutingComponent;
  let fixture: ComponentFixture<ProductTypeRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
