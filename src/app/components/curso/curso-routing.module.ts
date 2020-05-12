import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoListComponent } from './list/curso-list.component';
import { CursoFormComponent } from './form/curso-form.component';


const routes: Routes = [
  { path: '', component: CursoListComponent },
  { path: 'create', component: CursoFormComponent },
  { path: 'edit/:id', component: CursoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
