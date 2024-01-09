import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/core/interface/login';
import { LoginService } from 'src/app/core/services/login.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = {} as ILogin;

  constructor(
    private service: LoginService,
    private route: Router,
    private snackBar: SnackBarService
  ) {}
  ngOnInit(): void {
    sessionStorage.clear();
  }

  public autenticar(): void {
    this.service.autenticacao(this.usuario).subscribe(
      (response) => {
        if(response) {
          sessionStorage.setItem('username', response.data[0]);
          sessionStorage.setItem('role', response.data[1]);
          this.snackBar.abrirMessagem('Usuario autenticado com sucesso!');
          this.route.navigate(['/tarefa']);
        }
      },
      (err) => {
        this.snackBar.abrirMessagem(err.error.detalhes);
      }
    );
  }

  public cadastrarNavegate(): void {
    this.route.navigate(['/cadastrar/usuario']);
  }
}
