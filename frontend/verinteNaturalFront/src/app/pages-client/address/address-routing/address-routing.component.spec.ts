import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressRoutingComponent } from './address-routing.component';

describe('AddressRoutingComponent', () => {
  let component: AddressRoutingComponent;
  let fixture: ComponentFixture<AddressRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
