import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUsuarioComponent } from './input-usuario.component';

describe('InputUsuarioComponent', () => {
  let component: InputUsuarioComponent;
  let fixture: ComponentFixture<InputUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
