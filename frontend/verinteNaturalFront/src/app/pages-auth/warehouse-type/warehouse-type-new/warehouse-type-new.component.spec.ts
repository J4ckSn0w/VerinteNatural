import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTypeNewComponent } from './warehouse-type-new.component';

describe('WarehouseTypeNewComponent', () => {
  let component: WarehouseTypeNewComponent;
  let fixture: ComponentFixture<WarehouseTypeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseTypeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseTypeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
