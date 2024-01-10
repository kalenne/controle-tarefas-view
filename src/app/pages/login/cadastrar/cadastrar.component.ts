import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';
import { ToastMessage } from 'src/app/components/displayalert/toastMessage';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CadastrarComponent extends ToastMessage {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
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
      duration: 3 * 1000
    });
  }

  public cadastrarUsuario(): void {
    if (this.formGroup.valid) {
      let request: IUsuario = {
        ...this.formGroup.value,
        dataNascimento: this.datePipe.transform(
          this.formGroup.value.dataNascimento,
          'dd/MM/yyyy'
        ),
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

  public loginNavegate(): void {
    this.route.navigate(['/']);
  }
}
