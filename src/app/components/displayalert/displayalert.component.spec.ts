import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAlertComponent } from './displayalert.component';

describe('DisplayalertComponent', () => {
  let component: DisplayAlertComponent;
  let fixture: ComponentFixture<DisplayAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
