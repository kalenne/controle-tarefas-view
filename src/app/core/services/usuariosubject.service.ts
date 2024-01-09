import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IUsuarioLogado {
  matricula?: number,
  email?:string,
  role?:string
}

@Injectable()

export class UsuarioSubjectService {

  private _userData = new BehaviorSubject<IUsuarioLogado>({});

  constructor() { }

  setUsuario(user: IUsuarioLogado): void {
    this._userData.next(user);
  }

  getUsuario(): Observable <IUsuarioLogado> {
    return this._userData.asObservable();
  }

}
