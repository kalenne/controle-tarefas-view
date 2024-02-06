import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ToastMessage } from 'src/app/components/displayalert/toastMessage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent extends ToastMessage implements OnInit {
  usuario = {} as IUsuario;
  usuarioEditado = {} as IUsuario;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    super();
    this.formGroup = this.fb.group({
      dataNascimento: this.fb.control('', [Validators.required]),
      nome: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.retornarUsuario();
  }

  abrirToastMessage(messagem: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      data: messagem,
      duration: 3 * 1000
    });
  }

  public retornarUsuario() {
    const email = sessionStorage.getItem('username');
    if (email) {
      this.usuarioService.retornarUsuarioPorEmail(email).subscribe(
        (response) => {
          this.usuario = response.data;
        },
        (err) => this.abrirToastMessage('Autentique-se novamente!')
      );
    }
  }

  public editarUsuario(): void {
    this.edit = !this.edit;
    this.formGroup.get('nome')?.patchValue(this.usuario.nome);
    this.formGroup
      .get('dataNascimento')
      ?.patchValue(this.usuario.dataNascimento);
  }

  public salvarUsuarioEditado(): void {
    if (this.formGroup.valid) {
      this.usuario = { ...this.usuario, ...this.formGroup.value };
      this.usuarioService.editarUsuario(this.usuario).subscribe(() => {
        this.abrirToastMessage('Usuario editado com sucesso!');
        this.retornarUsuario();
        this.edit = !this.edit;
      });
    } else {
      this.abrirToastMessage('Dados Incompletos!');
    }
  }
}
