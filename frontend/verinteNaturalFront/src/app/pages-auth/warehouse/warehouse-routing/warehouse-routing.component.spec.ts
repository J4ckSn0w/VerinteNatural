import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRoutingComponent } from './warehouse-routing.component';

describe('WarehouseRoutingComponent', () => {
  let component: WarehouseRoutingComponent;
  let fixture: ComponentFixture<WarehouseRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
