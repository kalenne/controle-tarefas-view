import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/core/interface/usuario';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { PrioridadeEnum } from 'src/app/enums/controle.enum';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrls: ['./cadastrar-tarefa.component.css'],
  providers: [],
})
export class CadastrarTarefaComponent implements OnInit {
  usuario = {} as IUsuario;
  formGroup: FormGroup;
  usuarioLogado: string = '';
  matricula = sessionStorage.getItem('matricula');
  prioridades = Object.values(PrioridadeEnum);

  constructor(
    private usuarioService: UsuarioService,
    private tarefaService: TarefaService,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      matricula: this.fb.control('', [Validators.required]),
      descricao: this.fb.control('', [Validators.required]),
      prioridade: this.fb.control('', [Validators.required]),
      dataInicio: this.fb.control('', [Validators.required]),
      dataFinal: this.fb.control('', [Validators.required]),
      titulo: this.fb.control('', [Validators.required]),
      autor: this.fb.control(''),
    });
  }
  ngOnInit(): void {
    if (this.matricula) this.usuarioLogado = this.matricula;
  }

  public retornarUsuario(): void {
    this.usuario.nome = '';
    let matricula = this.formGroup.value.matricula;
    if (matricula) {
      this.usuarioService
        .retornarUsuarioPorMatricula(matricula)
        .subscribe((response) => (this.usuario = response.data));
    } else {
      this.snackBar.abrirMessagem('Dados incompletos!');
    }
  }

  public salvarTarefa(): void {
    if (this.formGroup.valid) {
      let tarefa: ITarefa = {
        ...this.formGroup.value,
        dataInicio: this.datePipe.transform(
          this.formGroup.value.dataInicio,
          'dd/MM/yyyy HH:mm:ss'
        ),
        dataFinal: this.datePipe.transform(
          this.formGroup.value.dataFinal,
          'dd/MM/yyyy HH:mm:ss'
        ),
      };
      tarefa.autor = this.usuarioLogado;
      this.tarefaService.salvarTarefa(tarefa).subscribe(
        () =>{ 
          this.snackBar.abrirMessagem('Atividade cadastrada com sucesso!');
          this.router.navigate(['/tarefa']);
        },
        (err) => this.snackBar.abrirMessagem(err.error.datalhes)
      );
    } else {
      this.snackBar.abrirMessagem('Dados incompletos!');
    }
  }
}
