import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTypeComponent } from './warehouse-type.component';

describe('WarehouseTypeComponent', () => {
  let component: WarehouseTypeComponent;
  let fixture: ComponentFixture<WarehouseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
