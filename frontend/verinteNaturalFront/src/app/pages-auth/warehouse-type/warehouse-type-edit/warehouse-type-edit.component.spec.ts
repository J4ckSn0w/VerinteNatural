import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTypeEditComponent } from './warehouse-type-edit.component';

describe('WarehouseTypeEditComponent', () => {
  let component: WarehouseTypeEditComponent;
  let fixture: ComponentFixture<WarehouseTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
