import { Component, OnInit } from '@angular/core';
import { AutenticarService } from 'src/app/core/services/autenticar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  validarRoleAutenticado: boolean = false;

  constructor(private autenticado: AutenticarService) { }

  ngOnInit(): void {
   // this.validarRoleAutenticado = sessionStorage.getItem('token') ? true : false;
   this.autenticado.estaAutenticado().subscribe((estaAutenticado) => this.validarRoleAutenticado = estaAutenticado);

  }

  destroySession() {
    sessionStorage.clear();
  }
 
}
