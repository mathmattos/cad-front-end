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
  cursoListForm: FormGroup;
  cursosPage = 10;
  totalCursos: number;
  cursosPageSize = 10;

  constructor(private cursoService: CursoService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.inicializaFormulario();
    this.getter(0, this.cursosPage);
    this.setTotalCursos();

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
    if (isDataValida) {
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


  paginate(event) {

    this.getter(event.page, this.cursosPage);
  }

  getter(page, size) {
    this.cursosPage.getPageCursos(page, size)
    .subscribe(
      dados => this.cursos = dados.content

    );
  }

  private setTotalCursos() {
    this.cursoService.getTotalCursos()
    .subscribe(
      (data) => {
        this.totalCursos = number;
      }
    );
  }


}
