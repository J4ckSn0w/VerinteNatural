import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAuthRoutingComponent } from './pages-auth-routing.component';

describe('PagesAuthRoutingComponent', () => {
  let component: PagesAuthRoutingComponent;
  let fixture: ComponentFixture<PagesAuthRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesAuthRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesAuthRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
