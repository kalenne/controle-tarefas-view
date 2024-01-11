import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';
import { ToastMessage } from 'src/app/components/displayalert/toastMessage';
import { ILogin } from 'src/app/core/interface/login';
import { LoginService } from 'src/app/core/services/login.service';

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
    private snackBar: MatSnackBar
  ) {
    super();
  }
  ngOnInit(): void {
    sessionStorage.clear();
  }

  abrirToastMessage(messagem: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      data: messagem,
      duration: 3 * 1000
    });
  }

  public autenticar(): void {
    this.service.autenticacao(this.usuario).subscribe(
      (response) => {
        if(response) {
          sessionStorage.setItem('username', response.data[0]);
          sessionStorage.setItem('role', response.data[1]);
          this.abrirToastMessage('Usuario autenticado com sucesso!');
          this.route.navigate(['/tarefa']);
        }
      },
      (err) => {
        this.abrirToastMessage(err.error.detalhes);
      }
    );
  }

  public cadastrarNavegate(): void {
    this.route.navigate(['/cadastrar/usuario']);
  }
}
