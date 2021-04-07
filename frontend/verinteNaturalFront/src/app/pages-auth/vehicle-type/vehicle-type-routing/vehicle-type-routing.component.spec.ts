import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeRoutingComponent } from './vehicle-type-routing.component';

describe('VehicleTypeRoutingComponent', () => {
  let component: VehicleTypeRoutingComponent;
  let fixture: ComponentFixture<VehicleTypeRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
