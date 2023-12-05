import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin } from '../interface/login';
import { Observable } from 'rxjs'
import { IResponse, IToken } from '../interface/response';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = `${environment.api}/auth`

  constructor(private http: HttpClient) { }

  public autenticacao (usuario: ILogin): Observable<IResponse<IToken>> {
    return this.http.post<IResponse<IToken>>(this.api, usuario);
  };

  public usuarioAutenticado (token: string) : Observable<IResponse<string>> {
    return this.http.get<IResponse<string>>(`${this.api}/${token}`);
  }

  
}
