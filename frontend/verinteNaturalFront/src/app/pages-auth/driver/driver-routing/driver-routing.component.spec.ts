import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRoutingComponent } from './driver-routing.component';

describe('DriverRoutingComponent', () => {
  let component: DriverRoutingComponent;
  let fixture: ComponentFixture<DriverRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
