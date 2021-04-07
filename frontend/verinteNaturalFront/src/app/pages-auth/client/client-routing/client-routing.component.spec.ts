import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRoutingComponent } from './client-routing.component';

describe('ClientRoutingComponent', () => {
  let component: ClientRoutingComponent;
  let fixture: ComponentFixture<ClientRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
