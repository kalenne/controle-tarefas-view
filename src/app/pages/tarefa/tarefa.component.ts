import { Component, OnInit } from '@angular/core';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { TarefaService } from 'src/app/core/services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  tarefaDados = [] as ITarefa[];

  usuarioMatricula: string = '';

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
  }
  
  public retornaDadosPorMatricula(): void {
    this.tarefaService.retornarTarefasPorMatricula(this.usuarioMatricula).subscribe(response => {
      console.log(response)
      this.tarefaDados = response;
    })
  }
}
