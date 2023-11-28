import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { 

    this.formGroup = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      email:this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required]),
      cpf: this.fb.control('', [Validators.required]),
      dataNascimento: this.fb.control('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  public cadastrarUsuario():void {
    if(this.formGroup.valid) {
      let request: IUsuario = {
        ...this.formGroup.value
      }
      this.usuarioService.salvarUsuario(request).subscribe(() => console.log(request));
    }
  }
}