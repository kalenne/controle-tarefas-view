import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { RolesEnum, UsuarioStatusEnum } from 'src/app/enums/controle.enum';

@Component({
  selector: 'app-input-usuario',
  templateUrl: './input-usuario.component.html',
  styleUrls: ['./input-usuario.component.css'],
})
export class InputUsuarioComponent implements OnChanges {
  @Input()
  usuario = {} as IUsuario;

  @Input()
  editUsuario: boolean = false;

  formGroup: FormGroup;

  status = Object.values(UsuarioStatusEnum);
  roles = Object.values(RolesEnum);

  date = new Date(new Date().getFullYear() - 18, 0, 1)
    .toISOString()
    .split('T')[0];

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      cpf: this.fb.control('', [Validators.required]),
      dataNascimento: this.fb.control('', [Validators.required]),
      status: this.fb.control('', [Validators.required]),
      matricula: this.fb.control('', [Validators.required]),
      roles: this.fb.control('', [Validators.required]),
    });
  }

  ngOnChanges(): void {
    this.valoresTabela();
  }

  valoresTabela(): void {
    this.formGroup.get('matricula')?.patchValue(this.usuario.matricula);
    this.formGroup.get('nome')?.patchValue(this.usuario.nome);
    this.formGroup.get('email')?.patchValue(this.usuario.email);
    this.formGroup.get('cpf')?.patchValue(this.usuario.cpf);
    this.formGroup.get('status')?.patchValue(this.usuario.status);
    this.formGroup.get('roles')?.patchValue(this.usuario.roles);
    this.formGroup
      .get('dataNascimento')
      ?.patchValue(this.usuario.dataNascimento);
  }

  cadastrarUsuario() {
    if (this.editUsuario == false) {
      if (this.formGroup.valid) {
        let result = { ...this.formGroup.value } as IUsuario;
        this.usuarioService
          .editarUsuarioPorMatricula(result.matricula, result)
          .subscribe(() => {});
      }
    }
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
