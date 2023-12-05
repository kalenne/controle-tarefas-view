import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/core/interface/usuario';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrls: ['./cadastrar-tarefa.component.css'],
})
export class CadastrarTarefaComponent implements OnInit {
  usuario = {} as IUsuario;
  formGroup: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private tarefaService: TarefaService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      matricula: this.fb.control('', [Validators.required]),
      descricao: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  public retornaUsuario() {
    this.usuario.nome = '';
    let matricula = this.formGroup.value.matricula;
    if (matricula) {
      this.usuarioService
        .retornarUsuarioPorMatricula(matricula)
        .subscribe((response) => (this.usuario = response.data));
    }
  }

  public salvarTarefa(): void {
    if (this.formGroup.valid) {
      let tarefa = this.formGroup.value;
      this.tarefaService.salvarTarefa(tarefa).subscribe();
    }
  }
}
