import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CursoRoutingModule } from './curso-routing.module';
import { CursoFormComponent } from './form/curso-form.component';
import { CursoListComponent } from './list/curso-list.component';



@NgModule({
  declarations: [CursoFormComponent, CursoListComponent],
  imports: [
    CommonModule,
    CursoRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CursoModule { }
