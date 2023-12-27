import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
  providers: []
})
export class CadastrarComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: Router,
    private snackBar: SnackBarService,

  ) {
    this.formGroup = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required]),
      cpf: this.fb.control('', [Validators.required]),
      dataNascimento: this.fb.control('', [Validators.required]),
    });
  }

  public cadastrarUsuario(): void {
    if (this.formGroup.valid) {
      let request: IUsuario = {
        ...this.formGroup.value
      };
      this.usuarioService.salvarUsuario(request).subscribe(() => {
        this.route.navigate(['/']);
        this.snackBar.abrirMessagem("Usuario cadastrado com sucesso!");
      }, (err) => {
        this.snackBar.abrirMessagem(err.error.texto);
      });
    } else {
      this.snackBar.abrirMessagem('Dados incompletos!');
    }
  }

  public loginNavegate(): void {
    this.route.navigate(['/']);
    
  }
    
}
