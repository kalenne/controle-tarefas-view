import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITarefa } from '../interface/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  api = `${environment.api}/api/tarefa`;

  constructor(private http: HttpClient) { }

  public retornarTarefasPorMatricula(matricula: string) {
    return this.http.get<ITarefa[]>(`${this.api}/${matricula}`);
  }

  public retornarTarefasAtivasPorMatricula(matricula: string) {
    return this.http.get<ITarefa[]>(`${this.api}/${matricula}/ativa`);
  }
}
