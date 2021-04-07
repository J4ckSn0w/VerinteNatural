import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeControlComponent } from './vehicle-type-control.component';

describe('VehicleTypeControlComponent', () => {
  let component: VehicleTypeControlComponent;
  let fixture: ComponentFixture<VehicleTypeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
