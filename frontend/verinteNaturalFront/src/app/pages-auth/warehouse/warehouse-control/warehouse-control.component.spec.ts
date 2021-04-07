import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseControlComponent } from './warehouse-control.component';

describe('WarehouseControlComponent', () => {
  let component: WarehouseControlComponent;
  let fixture: ComponentFixture<WarehouseControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
