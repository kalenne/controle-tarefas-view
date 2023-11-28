import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { InterceptorModule } from './core/modules/interceptor/interceptor.module';
import { CpfPipe } from './core/pipes/cpf.pipe';
import { CadastrarComponent } from './pages/login/cadastrar/cadastrar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuarioComponent,
    TarefaComponent,
    CpfPipe,
    CadastrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
