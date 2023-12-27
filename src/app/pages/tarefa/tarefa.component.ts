import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { RolesEnum } from 'src/app/enums/controle.enum';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
})
export class TarefaComponent implements OnInit {
  tarefaDados = [] as ITarefa[];
  usuarioMatricula: number | undefined;
  tipoUsuarioLogado = sessionStorage.getItem('role');
  validacaoUsuario: boolean = this.tipoUsuarioLogado === RolesEnum.ROLE_ADMIN ? true : false;

  constructor(
    private tarefaService: TarefaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.retornarDadosDoUsuario();
    
    
  }

  public retornarDadosPorMatricula(): void {
    if (this.usuarioMatricula) {
      this.tarefaService
        .retornarTarefasPorMatricula(this.usuarioMatricula)
        .subscribe(
          (response) => (this.tarefaDados = response.data),
          (err) => this.snackBar.abrirMessagem(err.error.message)
        );
    } else {
      
    }
  }

  public retornarDadosDoUsuario(): void {
    const usuario = sessionStorage.getItem('username');
    if (usuario) {
      this.usuarioService.retornarUsuarioPorEmail(usuario).subscribe(
        (response) => (this.usuarioMatricula = response.data.matricula),
        (err) => this.snackBar.abrirMessagem(err.error.detalhes)
      );
    }
  }

  public cadastrarNavegate(): void {
    this.router.navigate(['/cadastrar/tarefa']);
  }
}
