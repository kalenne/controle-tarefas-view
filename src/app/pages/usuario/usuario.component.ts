import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuario = {} as IUsuario;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  public getUsuario() {
    if (sessionStorage.getItem('username')) {
      const email = sessionStorage.getItem('username');

      this.usuarioService
        .retornaUsuarioPorEmail(email)
        .subscribe((response) => {
          this.usuario = response;
        });
    }
  }
}
