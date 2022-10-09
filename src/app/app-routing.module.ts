import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { EquipeComponent } from './equipe/equipe.component';
import { HabilidadeComponent } from './habilidade/habilidade.component';
import { PaginaComponent } from './pagina/pagina.component';

const routes: Routes = [
  {path: '', component: PaginaComponent},
  {path:'habilidade', component: HabilidadeComponent},
  {path:'contato', component: ContatoComponent},
  {path:'equipe', component:EquipeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
