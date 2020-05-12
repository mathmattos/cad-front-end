import { Component, OnInit } from '@angular/core';
import { Curso } from '../model/curso-model';
import { CursoService } from '../service/curso.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import DataUtil from 'src/app/shared/util/data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {

  cursos: Curso[] = [];
  cursoListForm: FormGroup

  constructor(private cursoService: CursoService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  inicializaFormulario() {
    this.cursoListForm = this.formBuilder.group({
      nome: [null],
      dataInicio: [null],
      dataFim: [null]
    });
  }

  consultar() {
    this.cursoListForm.value.dataInicio = DataUtil.dateInputAsString(this.cursoListForm.value.dataInicio);
    this.cursoListForm.value.dataFim = DataUtil.dateInputAsString(this.cursoListForm.value.dataFim);
    const isDataValida = DataUtil.compararDataHora(this.cursoListForm.value.dataInicio, this.cursoListForm.value.dataFim);
    if(isDataValida) {
      this.cursoService.getCursos().subscribe(cursos => {
        this.cursos = cursos;
      });
    } else {
      this.toastr.error('Data Fim é maior que Data Inicio', '', {
        timeOut: 3000
      });
    }
  }

  deletar(id: number) {
    if (id) {
      this.cursoService.deletar(id).subscribe(res => {
        this.consultar();
      });
    }
  }

}
