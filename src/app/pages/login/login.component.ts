import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/core/interface/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {} as ILogin;

  
  constructor(private service: LoginService, private route: Router) { }

  ngOnInit(): void {
  }

  public autentica():void{
    this.service.autenticacao(this.usuario).subscribe(response =>{
      const token = response.data.token;
      sessionStorage.setItem('token', token);

      this.service.usuarioAutenticado(token).subscribe(usuarioData => {
        sessionStorage.setItem('username', usuarioData.data);
        
        this.route.navigate([('/usuario')]);

      });

    });
  }

}
