import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/core/interface/login';
import { IResponse } from 'src/app/core/interface/response';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = {} as ILogin;

  constructor(private service: LoginService, private route: Router) {}

  ngOnInit(): void {}

  public autentica(): void {
    this.service.autenticacao(this.usuario).subscribe((response) => {
      const token = response.data.token;
      if (token) {
        sessionStorage.setItem('token', token);
        this.usuarioAutenticado(token);
      }
    });
  }

  public usuarioAutenticado(token: string): void {
    this.service.usuarioAutenticado(token).subscribe((usuarioData) => {
      sessionStorage.setItem('username', usuarioData.data);

      this.route.navigate(['/usuario']);
    });
  }
}
