import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartProductListComponent } from './shopping-cart-product-list.component';

describe('ShoppingCartProductListComponent', () => {
  let component: ShoppingCartProductListComponent;
  let fixture: ComponentFixture<ShoppingCartProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
