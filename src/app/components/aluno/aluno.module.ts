import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { AlunoRoutingModule } from './aluno-routing.module';
import { AlunoFormComponent } from './form/aluno-form.component';
import { AlunoListComponent } from './list/aluno-list.component';


@NgModule({
  declarations: [AlunoFormComponent, AlunoListComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule
  ]
})
export class AlunoModule { }
