import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITarefa } from '../interface/tarefa';

@Injectable({
  providedIn: 'root'
})
export class DataTarefaSubjectService {

  private dadosCompartilhados = new Subject<ITarefa>();

  constructor() { }

  enviarDados(dados: ITarefa) {
    this.dadosCompartilhados.next(dados);
  }

  obterDados() {
    return this.dadosCompartilhados.asObservable();
  }
}
