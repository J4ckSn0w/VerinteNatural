import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRoutingComponent } from './vehicle-routing.component';

describe('VehicleRoutingComponent', () => {
  let component: VehicleRoutingComponent;
  let fixture: ComponentFixture<VehicleRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
