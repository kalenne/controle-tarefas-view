import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin } from '../interface/login';
import { Observable } from 'rxjs'
import { IResponse, IToken } from '../interface/response';
import { switchMap } from 'rxjs/operators';
import { AutenticarService } from './autenticar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = `${environment.api}/auth`

  constructor(private http: HttpClient, private autenticado: AutenticarService) { }

  public autenticacao (usuario: ILogin): Observable<IResponse<string[]>> {
    return this.http.post<IResponse<IToken>>(this.api, usuario).pipe(
      switchMap(token => {
        sessionStorage.setItem('token', token.data.token)
        this.autenticado.setAutenticado(true);
        return  this.usuarioAutenticado(token.data.token);
      })
    );
  };

  public usuarioAutenticado (token: string) : Observable<IResponse<string[]>> {
    return this.http.get<IResponse<string[]>>(`${this.api}/${token}`);
  }

  
}
