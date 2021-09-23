import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesRoutingComponent } from './pages-routing.component';

describe('PagesRoutingComponent', () => {
  let component: PagesRoutingComponent;
  let fixture: ComponentFixture<PagesRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
