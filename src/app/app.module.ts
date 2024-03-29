import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { InterceptorModule } from './core/modules/interceptor/interceptor.module';
import { CpfPipe } from './core/pipes/cpf.pipe';
import { CadastrarComponent } from './pages/login/cadastrar/cadastrar.component';
import { CadastrarTarefaComponent } from './pages/tarefa/cadastrar-tarefa/cadastrar-tarefa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayAlertComponent } from './components/displayalert/displayalert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './core/modules/material/material.module';
import { DatePipe, registerLocaleData } from '@angular/common';
import { InputTarefasComponent } from './components/input-tarefas/input-tarefas.component';
import { EnumdisplayPipe } from './core/pipes/enumdisplay.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsuariosComponent } from './pages/perfil/admin/usuarios/usuarios.component';
import ptBr from '@angular/common/locales/pt';
import { InputUsuarioComponent } from './components/input-usuario/input-usuario.component';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    TarefaComponent,
    CpfPipe,
    CadastrarComponent,
    CadastrarTarefaComponent,
    DisplayAlertComponent,
    NavbarComponent,
    InputTarefasComponent,
    EnumdisplayPipe,
    UsuariosComponent,
    InputUsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InterceptorModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
