import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/core/interface/login';
import { LoginService } from 'src/app/core/services/login.service';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = {} as ILogin;

  constructor(private service: LoginService, private route: Router, private snackBar: SnackBarService) {}
  ngOnInit(): void {
    sessionStorage.clear();
  }

  public autenticar(): void {
    this.service.autenticacao(this.usuario).subscribe((response) => {
      const token = response.data.token;
      if (token) {
        sessionStorage.setItem('token', token);
        this.snackBar.abrirMessagem('Usuario autenticado com sucesso!');
        this.usuarioAutenticado(token);
      }
    }, (err) => {
        this.snackBar.abrirMessagem(err.error.detalhes);
    });
  }

  public usuarioAutenticado(token: string): void {
    this.service.usuarioAutenticado(token).subscribe((usuarioData) => {
      sessionStorage.setItem('username', usuarioData.data);
      
      this.route.navigate(['/usuario']);
    });
  }

  public cadastrarNavegate(): void {
    this.route.navigate(['/cadastrar/usuario']);
  }

}
