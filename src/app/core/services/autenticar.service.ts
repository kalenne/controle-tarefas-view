import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticarService {
  private usuarioAutenticado = new BehaviorSubject<boolean>(false);

  constructor() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.usuarioAutenticado.next(true);
    }
  }

  setAutenticado(autenticado: boolean): void {
    this.usuarioAutenticado.next(autenticado);
  }

  estaAutenticado() {
    return this.usuarioAutenticado.asObservable();
  }
}
