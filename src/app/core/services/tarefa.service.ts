import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  api = `${environment.api}/api/tarefa`;

  constructor() { }
}
