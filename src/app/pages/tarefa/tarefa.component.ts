import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import {
  PrioridadeEnum,
  RolesEnum,
  TipoStatusEnum,
} from 'src/app/enums/controle.enum';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';
import { ToastMessage } from 'src/app/components/displayalert/toastMessage';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
})
export class TarefaComponent extends ToastMessage implements OnInit {
  tarefaDados = [] as ITarefa[];
  usuarioMatricula: number | undefined;
  tipoUsuarioLogado = sessionStorage.getItem('role');
  validacaoUsuario: boolean =
    this.tipoUsuarioLogado === RolesEnum.ROLE_ADMIN ? true : false;
  tarefa = {} as ITarefa;
  editTarefa: boolean = true;

  constructor(
    private tarefaService: TarefaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.retornarDadosPorMatricula();
  }

  abrirToastMessage(messagem: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      data: messagem,
      duration: 2 * 1000,
    });
  }

  public retornarDadosPorMatricula(): void {
    const usuario = sessionStorage.getItem('username');
    this.tarefaDados = [];

    if (usuario) {
      this.usuarioService
        .retornarUsuarioPorEmail(usuario)
        .pipe(
          switchMap((dadosUsuario) => {
            if (this.usuarioMatricula == null && dadosUsuario.data.matricula) {
              sessionStorage.setItem(
                'matricula',
                dadosUsuario.data.matricula?.toString()
              );
              this.usuarioMatricula = dadosUsuario.data.matricula;
            }
            return this.tarefaService.retornarTarefasPorMatricula(
              this.usuarioMatricula
            );
          })
        )
        .subscribe(
          (response) => {
            if (response.data.length >= 1) {
              this.tarefaDados = response.data;
            } else {
              this.abrirToastMessage('Usuário sem tarefas!');
            }
          },
          (err) => this.abrirToastMessage(err.error.message)
        );
    }
  }

  public cadastrarNavegate(): void {
    this.router.navigate(['/cadastrar/tarefa']);
  }

  public tarefaSelecionada(tarefa: ITarefa): void {
    this.tarefa = tarefa;
  }

}
