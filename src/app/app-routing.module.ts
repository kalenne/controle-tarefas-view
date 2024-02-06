import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { CadastrarComponent } from './pages/login/cadastrar/cadastrar.component';
import { CadastrarTarefaComponent } from './pages/tarefa/cadastrar-tarefa/cadastrar-tarefa.component';
import { UsuariosComponent } from './pages/perfil/admin/usuarios/usuarios.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"usuario", component: PerfilComponent},
  {path:"admin/usuarios", component: UsuariosComponent},
  {path:'tarefa', component: TarefaComponent},
  {path:'cadastrar/usuario', component: CadastrarComponent},
  {path:'cadastrar/tarefa', component: CadastrarTarefaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
