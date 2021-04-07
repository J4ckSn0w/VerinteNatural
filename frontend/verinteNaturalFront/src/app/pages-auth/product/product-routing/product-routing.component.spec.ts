import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRoutingComponent } from './product-routing.component';

describe('ProductRoutingComponent', () => {
  let component: ProductRoutingComponent;
  let fixture: ComponentFixture<ProductRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
