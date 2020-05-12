import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'aluno',
    loadChildren: () => import('./components/aluno/aluno.module').then(m => m.AlunoModule)
  },
  {
    path: 'curso',
    loadChildren: () => import('./components/curso/curso.module').then(m => m.CursoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
