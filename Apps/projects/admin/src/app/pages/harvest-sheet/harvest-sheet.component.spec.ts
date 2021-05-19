import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestSheetComponent } from './harvest-sheet.component';

describe('HarvestSheetComponent', () => {
  let component: HarvestSheetComponent;
  let fixture: ComponentFixture<HarvestSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarvestSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarvestSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
