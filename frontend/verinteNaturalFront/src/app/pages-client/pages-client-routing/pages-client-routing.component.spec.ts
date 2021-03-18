import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesClientRoutingComponent } from './pages-client-routing.component';

describe('PagesClientRoutingComponent', () => {
  let component: PagesClientRoutingComponent;
  let fixture: ComponentFixture<PagesClientRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesClientRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesClientRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
