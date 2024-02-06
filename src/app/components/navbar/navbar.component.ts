import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AutenticarService } from 'src/app/core/services/autenticar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  validarRoleAutenticado: boolean = false;

  constructor(private autenticado: AutenticarService) {}

  ngOnInit(): void {
    this.autenticado
      .estaAutenticado()
      .subscribe(
        (estaAutenticado) => (this.validarRoleAutenticado = estaAutenticado)
      );
  }

  destroySession() {
    sessionStorage.clear();
  }
}
