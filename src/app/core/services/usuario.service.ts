import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../interface/response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = `${environment.api}/api/usuario`;

  constructor(private http: HttpClient) { }

  public retornarUsuarioPorEmail(email: string | null): Observable<IResponse<IUsuario>> {
    return this.http.get<IResponse<IUsuario>>(`${this.api}/e/${email}`);
  }

  public retornarUsuarioPorMatricula(matricula: string | null): Observable<IResponse<IUsuario>> {
    return this.http.get<IResponse<IUsuario>>(`${this.api}/${matricula}`);
  }

  public retornarTodosUsuarios():Observable<IResponse<IUsuario[]>>{
    return this.http.get<IResponse<IUsuario[]>>(`${this.api}/admin/usuarios`);
  }

  public salvarUsuario(usuario: IUsuario):Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.api}/salvar`, usuario);
  }

  public editarUsuarioPorEmail(usuario: IUsuario):Observable<IUsuario>{
    return this.http.put<IUsuario>(`${this.api}/editar`, usuario);
  }

  public editarUsuarioPorMatricula(matricula:number | undefined, usuario: IUsuario):Observable<IUsuario>{
    return this.http.put<IUsuario>(`${this.api}/editar/${matricula}`, usuario);
  }
}
