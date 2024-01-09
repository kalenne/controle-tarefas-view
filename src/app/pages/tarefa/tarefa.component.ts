import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { RolesEnum } from 'src/app/enums/controle.enum';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
})
export class TarefaComponent implements OnInit {
  tarefaDados = [] as ITarefa[];
  usuarioMatricula: number | undefined;
  tipoUsuarioLogado = sessionStorage.getItem('role');
  validacaoUsuario: boolean =
    this.tipoUsuarioLogado === RolesEnum.ROLE_ADMIN ? true : false;
  tarefa = {} as ITarefa;
  editTarefa:boolean = true;
  constructor(
    private tarefaService: TarefaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.retornarDadosPorMatricula();
  }

  public retornarDadosPorMatricula(): void {
    const usuario = sessionStorage.getItem('username');

    if (usuario) {
      this.usuarioService
        .retornarUsuarioPorEmail(usuario)
        .pipe(
          switchMap((dadosUsuario) => {
            if (this.usuarioMatricula == null) {
              this.usuarioMatricula = dadosUsuario.data.matricula;
            }

            return this.tarefaService.retornarTarefasPorMatricula(
              this.usuarioMatricula
            );
          })
        )
        .subscribe(
          (response) => {
            if (response.data.length > 1) {
              this.tarefaDados = response.data;
            } else {
              this.snackBar.abrirMessagem('Usuário sem tarefas!');
            }
          },
          (err) => this.snackBar.abrirMessagem(err.error.message)
        );
    }
  }

  public cadastrarNavegate(): void {
    this.router.navigate(['/cadastrar/tarefa']);
  }

  public tarefaSelecionada(tarefa: ITarefa): void {
    this.tarefa = tarefa;
  }

  public editarTarefa() {
    this.editTarefa = !this.editTarefa;
  }
 }
