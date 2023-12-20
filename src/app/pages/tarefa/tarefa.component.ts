import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ITarefa } from 'src/app/core/interface/tarefa';
import { TarefaService } from 'src/app/core/services/tarefa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';
import { Roles } from 'src/app/enums/controle.enum';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
})
export class TarefaComponent implements OnInit {
  tarefaDados = [] as ITarefa[];
  usuarioMatricula: number | undefined;
  tipoUsuario = {} as Roles;
  tipoUsuarioLogado = sessionStorage.getItem('role');

  constructor(
    private tarefaService: TarefaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
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
          (err) => this.toastMessage(err.error.message)
        );
    } else {
      
    }
  }

  public retornarDadosDoUsuario(): void {
    const usuario = sessionStorage.getItem('username');
    if (usuario) {
      this.usuarioService.retornarUsuarioPorEmail(usuario).subscribe(
        (response) => (this.usuarioMatricula = response.data.matricula),
        (err) => this.toastMessage(err.error.detalhes)
      );
    }
  }

  public cadastrarNavegate(): void {
    this.router.navigate(['/cadastrar/tarefa']);
  }

  public toastMessage(message: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      duration: 3 * 1000,
      data: message,
    });
  }

  public validarRole():boolean {
    if( this.tipoUsuarioLogado === Roles.ROLE_ADMIN) {
      return true;
    }
    return false;
  }

}
