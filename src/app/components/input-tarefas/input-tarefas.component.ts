import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { IUsuario } from 'src/app/core/interface/usuario';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { PrioridadeEnum, TipoStatusEnum } from 'src/app/enums/controle.enum';
import { ToastMessage } from '../displayalert/toastMessage';
import { DisplayAlertComponent } from '../displayalert/displayalert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-input-tarefas',
  templateUrl: './input-tarefas.component.html',
  styleUrls: ['./input-tarefas.component.css'],
})
export class InputTarefasComponent extends ToastMessage implements OnChanges {
  @Input()
  tarefa = {} as ITarefa;

  @Input()
  editTarefa: boolean = false;

  prioridades = Object.values(PrioridadeEnum);
  status = Object.values(TipoStatusEnum);
  dataInicio: Date | undefined;
  dataFinal: Date | undefined;
  usuario = {} as IUsuario;
  formGroup: FormGroup;

  dateMin = new Date().toISOString().slice(0, 16);
  dateMax = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    .toISOString()
    .slice(0, 16);

  constructor(
    private usuarioService: UsuarioService,
    private tarefaService: TarefaService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    super();
    this.formGroup = this.fb.group({
      matricula: this.fb.control('', [Validators.required]),
      descricao: this.fb.control('', [Validators.required]),
      prioridade: this.fb.control('', [Validators.required]),
      status: this.fb.control('', [Validators.required]),
      dataInicio: this.fb.control('', [Validators.required]),
      dataFinal: this.fb.control('', [Validators.required]),
      titulo: this.fb.control('', [Validators.required]),
      autor: this.fb.control(''),
      codigo: this.fb.control(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tarefa) {
      this.dataInicio = this.conversãoDoDatePicker(this.tarefa.dataInicio);
      this.dataFinal = this.conversãoDoDatePicker(this.tarefa.dataFinal);
      this.valoresTarefas();
    }
  }

  abrirToastMessage(messagem: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      data: messagem,
      duration: 3 * 1000,
    });
  }

  conversãoDoDatePicker(data: string): Date {
    const partes = data.split(/[\s/:]+/);
    const [dia, mes, ano, hora, minuto, segundo] = partes;

    return new Date(+ano, +mes - 1, +dia, +hora, +minuto, +segundo);
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

  valoresTarefas(): void {
    this.formGroup.get('matricula')?.patchValue(this.tarefa.matricula);
    this.retornarUsuario();
    this.formGroup.get('descricao')?.patchValue(this.tarefa.descricao);
    this.formGroup.get('status')?.patchValue(this.tarefa.status);
    this.formGroup.get('prioridade')?.patchValue(this.tarefa.prioridade);
    this.formGroup.get('titulo')?.patchValue(this.tarefa.titulo);
    this.formGroup.get('autor')?.patchValue(this.tarefa.autor);
    this.formGroup.get('dataInicio')?.patchValue(this.tarefa.dataInicio);
    this.formGroup.get('dataFinal')?.patchValue(this.tarefa.dataFinal);
    this.formGroup.get('codigo')?.patchValue(this.tarefa.codigo);
  }

  salvarTarefa(): void {
    if (this.editTarefa == false) {
      let tarefaExistente: ITarefa = {
        ...this.formGroup.value,
        
      };
      this.tarefaService.salvarTarefaExistente(tarefaExistente).subscribe(() => {})
    }
  }

}

