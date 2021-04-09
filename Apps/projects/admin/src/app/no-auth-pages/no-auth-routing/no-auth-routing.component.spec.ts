import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthRoutingComponent } from './no-auth-routing.component';

describe('NoAuthRoutingComponent', () => {
  let component: NoAuthRoutingComponent;
  let fixture: ComponentFixture<NoAuthRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAuthRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAuthRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
