import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/core/interface/usuario';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { PrioridadeEnum } from 'src/app/enums/controle.enum';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessage } from 'src/app/components/displayalert/toastMessage';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrls: ['./cadastrar-tarefa.component.css'],
  providers: [],
})
export class CadastrarTarefaComponent extends ToastMessage implements OnInit {
  usuario = {} as IUsuario;
  formGroup: FormGroup;
  usuarioLogado: string = '';
  matricula = sessionStorage.getItem('matricula');
  prioridades = Object.values(PrioridadeEnum);

  constructor(
    private usuarioService: UsuarioService,
    private tarefaService: TarefaService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private router: Router
  ) {
    super();
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

  abrirToastMessage(messagem: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      data: messagem,
      duration: 3 * 1000
    });
  }

  public retornarUsuario(): void {
    this.usuario.nome = '';
    let matricula = this.formGroup.value.matricula;
    if (matricula) {
      this.usuarioService
        .retornarUsuarioPorMatricula(matricula)
        .subscribe((response) => (this.usuario = response.data));
    } else {
      this.abrirToastMessage('Dados incompletos!');
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
        () => {
          this.abrirToastMessage('Atividade cadastrada com sucesso!');
          this.router.navigate(['/tarefa']);
        },
        (err) => this.abrirToastMessage(err.error.datalhes)
      );
    } else {
      this.abrirToastMessage('Dados incompletos!');
    }
  }

  retornarPagina(): void {
    this.router.navigate(['/tarefa']);
  }
}
