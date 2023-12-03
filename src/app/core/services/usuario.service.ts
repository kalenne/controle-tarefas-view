import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = `${environment.api}/api/usuario`;

  constructor(private http: HttpClient) { }

  public retornaUsuarioPorEmail(email: string | null): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.api}/e/${email}`);
  }

  public salvarUsuario(usuario: IUsuario) {
    return this.http.post(`${this.api}/salvar`, usuario);
  }

  public editarUsuario(usuario: IUsuario){
    return this.http.put(`${this.api}/editar`, usuario);
  }
}
