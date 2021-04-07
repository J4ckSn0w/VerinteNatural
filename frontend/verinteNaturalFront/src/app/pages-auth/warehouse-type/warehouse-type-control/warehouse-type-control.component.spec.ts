import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTypeControlComponent } from './warehouse-type-control.component';

describe('WarehouseTypeControlComponent', () => {
  let component: WarehouseTypeControlComponent;
  let fixture: ComponentFixture<WarehouseTypeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseTypeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseTypeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
