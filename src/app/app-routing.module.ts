import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { CadastrarComponent } from './pages/login/cadastrar/cadastrar.component';
import { CadastrarTarefaComponent } from './pages/tarefa/cadastrar-tarefa/cadastrar-tarefa.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"usuario", component: UsuarioComponent},
  {path:'tarefa', component: TarefaComponent},
  {path:'cadastrar/usuario', component: CadastrarComponent},
  {path:'cadastrar/tarefa', component: CadastrarTarefaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
