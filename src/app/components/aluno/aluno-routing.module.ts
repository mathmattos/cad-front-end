import { AlunoListComponent } from './list/aluno-list.component';
import { AlunoFormComponent } from './form/aluno-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: AlunoListComponent },
  { path: 'create', component: AlunoFormComponent },
  { path: 'edit/:id', component: AlunoFormComponent },
  { path: 'detail/:id', component: AlunoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
