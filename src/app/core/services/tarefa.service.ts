import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITarefa } from '../interface/tarefa';
import { Observable } from 'rxjs';
import { IResponse } from '../interface/response';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  api = `${environment.api}/api/tarefa`;

  constructor(private http: HttpClient) { }

  public retornarTarefasPorMatricula(matricula: string): Observable<IResponse<ITarefa[]>> {
    return this.http.get<IResponse<ITarefa[]>>(`${this.api}/${matricula}`);
  }

  public retornarTarefasAtivasPorMatricula(matricula: string): Observable<IResponse<ITarefa[]>> {
    return this.http.get<IResponse<ITarefa[]>>(`${this.api}/${matricula}/ativa`);
  }

  public salvarTarefa(tarefa: ITarefa): Observable<ITarefa> {
    return this.http.post<ITarefa>(`${this.api}`, tarefa);
  }
}
