import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileControlComponent } from './profile-control.component';

describe('ProfileControlComponent', () => {
  let component: ProfileControlComponent;
  let fixture: ComponentFixture<ProfileControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
