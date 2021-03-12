import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthRoutesComponent } from './no-auth-routes.component';

describe('NoAuthRoutesComponent', () => {
  let component: NoAuthRoutesComponent;
  let fixture: ComponentFixture<NoAuthRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAuthRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAuthRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
