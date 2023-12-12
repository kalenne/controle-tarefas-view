import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/core/interface/usuario';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';

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
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.fb.group({
      matricula: this.fb.control('', [Validators.required]),
      descricao: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  public retornarUsuario(): void {
    this.usuario.nome = '';
    let matricula = this.formGroup.value.matricula;
    if (matricula) {
      this.usuarioService
        .retornarUsuarioPorMatricula(matricula)
        .subscribe((response) => (this.usuario = response.data));
    } else {
      this.toastMessage('Dados incompletos!');
    }
  }

  public salvarTarefa(): void {
    if (this.formGroup.valid) {
      let tarefa = this.formGroup.value;
      this.tarefaService.salvarTarefa(tarefa).subscribe(() => this.toastMessage('Atividade cadastrada com sucesso!'),
      (err)=> this.toastMessage(err.error.datalhes));
    } else {
      this.toastMessage('Dados incompletos!');
    }
  }

  public toastMessage (message: string):void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      duration: 1 * 1000,
      data: message
    })
  }
}
