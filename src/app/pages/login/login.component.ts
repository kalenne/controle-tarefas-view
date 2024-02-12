import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';
import { ToastMessage } from 'src/app/components/displayalert/toastMessage';
import { ILogin } from 'src/app/core/interface/login';
import { LoginService } from 'src/app/core/services/login.service';
import { TipoUsuarioService } from 'src/app/core/services/tipo-usuario.service';
import { RolesEnum } from 'src/app/enums/controle.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends ToastMessage implements OnInit {
  usuario = {} as ILogin;

  constructor(
    private service: LoginService,
    private route: Router,
    private snackBar: MatSnackBar,
    private tipoUsuario: TipoUsuarioService
  ) {
    super();
  }
  ngOnInit(): void {
    sessionStorage.clear();
  }

  abrirToastMessage(messagem: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      data: messagem,
      duration: 2 * 1000,
    });
  }

  public autenticar(): void {
    this.service.autenticacao(this.usuario).subscribe(
      (response) => {
        if (response) {
          sessionStorage.setItem('username', response.data[0]);
          let role = this.stringParaRolesEnum(response.data[1]);
          sessionStorage.setItem('role', role);
          this.tipoUsuario.setTipoUsuario(role);

          this.abrirToastMessage('Usuario autenticado com sucesso!');
          this.route.navigate(['/tarefa']);
        }
      },
      (err) => {
        this.abrirToastMessage(err.error.detalhes);
      }
    );
  }

  stringParaRolesEnum(str: string): RolesEnum {
    switch (str) {
      case 'ROLE_ADMIN':
        return RolesEnum.ROLE_ADMIN;
      case 'ROLE_USER':
        return RolesEnum.ROLE_USER;
      default:
        throw new Error('Role desconhecida');
    }
  }
}
