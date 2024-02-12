import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';
import { ToastMessage } from 'src/app/components/displayalert/toastMessage';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent extends ToastMessage {

  formGroup: FormGroup;
  date = new Date(new Date().getFullYear() - 18, 0, 1).toISOString().split('T')[0];

  
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: Router,
    private snackBar: MatSnackBar,
  ) {
    super();
    this.formGroup = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required]),
      cpf: this.fb.control('', [Validators.required]),
      dataNascimento: this.fb.control('', [Validators.required]),
    });
  }

  abrirToastMessage(messagem: string): void {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      data: messagem,
      duration: 3 * 1000,
    });
  }

  public cadastrarUsuario(): void {
    if (this.formGroup.valid) {
      let request: IUsuario = {
        ...this.formGroup.value,
      };
      this.usuarioService.salvarUsuario(request).subscribe(
        () => {
          this.route.navigate(['/']);
          this.abrirToastMessage('Usuario cadastrado com sucesso!');
        },
        (err) => {
          this.abrirToastMessage(err.error.texto);
        }
      );
    } else {
      this.abrirToastMessage('Dados incompletos!');
    }
  }

  retornarPagina() {
    this.route.navigate(['/']);
  }

}
