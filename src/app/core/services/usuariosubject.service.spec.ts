import { TestBed } from '@angular/core/testing';

import { UsuariosubjectService } from './usuariosubject.service';

describe('UsuariosubjectService', () => {
  let service: UsuariosubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
