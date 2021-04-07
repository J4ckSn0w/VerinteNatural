import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTypeRoutingComponent } from './warehouse-type-routing.component';

describe('WarehouseTypeRoutingComponent', () => {
  let component: WarehouseTypeRoutingComponent;
  let fixture: ComponentFixture<WarehouseTypeRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseTypeRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseTypeRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
