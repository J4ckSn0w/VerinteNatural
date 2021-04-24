import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesModalComponent } from './addresses-modal.component';

describe('AddressesModalComponent', () => {
  let component: AddressesModalComponent;
  let fixture: ComponentFixture<AddressesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
