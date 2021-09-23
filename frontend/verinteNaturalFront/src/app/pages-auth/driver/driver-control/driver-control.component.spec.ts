import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverControlComponent } from './driver-control.component';

describe('DriverControlComponent', () => {
  let component: DriverControlComponent;
  let fixture: ComponentFixture<DriverControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
