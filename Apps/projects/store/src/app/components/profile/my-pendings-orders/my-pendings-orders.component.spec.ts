import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPendingsOrdersComponent } from './my-pendings-orders.component';

describe('MyPendingsOrdersComponent', () => {
  let component: MyPendingsOrdersComponent;
  let fixture: ComponentFixture<MyPendingsOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPendingsOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPendingsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
