import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  private usuarioAutenticado = new BehaviorSubject<{role:string}>({role:'string'});

  constructor() {
    const role = sessionStorage.getItem('role');
    if (role) {
      this.usuarioAutenticado.next({role: role});
    }
  }

  setTipoUsuario(tipo: string): void {
    this.usuarioAutenticado.next({role:tipo});
  }

  retornarTipoUsuario() {
    return this.usuarioAutenticado.asObservable();
  }
}
