import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTarefasComponent } from './input-tarefas.component';

describe('InputTarefasComponent', () => {
  let component: InputTarefasComponent;
  let fixture: ComponentFixture<InputTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTarefasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
