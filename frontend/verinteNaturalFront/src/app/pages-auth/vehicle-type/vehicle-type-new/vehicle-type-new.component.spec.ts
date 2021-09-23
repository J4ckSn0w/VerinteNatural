import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeNewComponent } from './vehicle-type-new.component';

describe('VehicleTypeNewComponent', () => {
  let component: VehicleTypeNewComponent;
  let fixture: ComponentFixture<VehicleTypeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
