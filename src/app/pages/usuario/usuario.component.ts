import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuario = {} as IUsuario;
  usuarioEditado = {} as IUsuario;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private snackBar: SnackBarService) {
    this.formGroup = this.fb.group({
      dataNascimento: this.fb.control('', [Validators.required]),
      nome: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.retornarUsuario();
  }

  public retornarUsuario() {
    const email = sessionStorage.getItem('username');
    if (email) {
      this.usuarioService
        .retornarUsuarioPorEmail(email)
        .subscribe((response) => {
          this.usuario = response.data;
          if(response.data.matricula !== undefined && response.data.roles !== undefined ) {
            sessionStorage.setItem('matricula', response.data.matricula?.toString());
            sessionStorage.setItem('role', response.data.roles);
          }
        }, (err) => this.snackBar.abrirMessagem("Autentique-se novamente!"));
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
        this.snackBar.abrirMessagem("Usuario editado com sucesso!");
        this.retornarUsuario();
        this.edit = !this.edit;
      });
    } else {
      this.snackBar.abrirMessagem("Dados Incompletos!");
    }
  }

}
