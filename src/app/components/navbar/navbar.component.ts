import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AutenticarService } from 'src/app/core/services/autenticar.service';
import { TipoUsuarioService } from 'src/app/core/services/tipo-usuario.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  validarRoleAutenticado: boolean = false;
  tipoUsuario: string = '';

  constructor(private autenticado: AutenticarService, private tipoUsuarioS: TipoUsuarioService) {}


  ngOnInit(): void {
    this.autenticado
      .estaAutenticado()
      .subscribe(
        (estaAutenticado) => {
          this.validarRoleAutenticado = estaAutenticado;
        }
      );
      
    this.tipoUsuarioS.retornarTipoUsuario().subscribe((tipo) => {this.tipoUsuario = tipo.role})
      

  }

  destroySession() {
    sessionStorage.clear();
  }
}
