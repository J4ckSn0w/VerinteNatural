import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSystemComponent } from './home-system.component';

describe('HomeSystemComponent', () => {
  let component: HomeSystemComponent;
  let fixture: ComponentFixture<HomeSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
