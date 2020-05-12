import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursoService } from '../service/curso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import DataUtil from 'src/app/shared/util/data';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit {

  cursoForm: FormGroup;
  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private cursoService: CursoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.inicializaFormulario();
    this.preencheCamposParaEdicao();
  }

  inicializaFormulario() {
    this.cursoForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(80)]],
      ementa: [null, [Validators.required, Validators.maxLength(5000)]],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      qtdMaxAluno: [null, Validators.required]
    });
  }

  preencheCamposParaEdicao() {
    if (this.id) {
      this.cursoService.findById(this.id).subscribe(curso => {
        if (curso) {
          this.cursoForm.setValue({
            id: curso.id,
            nome: curso.nome,
            ementa: curso.ementa,
            dataInicio: curso.dataInicio,
            dataFim: curso.dataFim,
            qtdMaxAluno: curso.qtdMaxAluno
          });
        }
      });
    }
  }

  submeteFormulario() {
    this.cursoForm.value.dataInicio = DataUtil.dateInputAsString(this.cursoForm.value.dataInicio);
    this.cursoForm.value.dataFim = DataUtil.dateInputAsString(this.cursoForm.value.dataFim);
    const isDataValida = DataUtil.compararDataHora(this.cursoForm.value.dataInicio, this.cursoForm.value.dataFim);
    if (this.cursoForm.valid && isDataValida) {
      if (this.id) {
        this.alterar();
      } else {
        this.salvar();
      }
      this.cursoForm.reset();
    } else {
      if (!isDataValida) {
        this.toastr.error('Data Fim é maior que Data Inicio', '', {
          timeOut: 3000
        });
      } else {
        this.toastr.error('Existem campos obrigatórios', '', {
          timeOut: 3000
        });
      }
    }
  }

  salvar() {
    this.cursoService.salvar(this.cursoForm.value).subscribe(curso => {
      if (curso) {
        this.router.navigate(['/curso']);
        this.toastr.success('Salvo com Sucesso', '', {
          timeOut: 3000
        });
      }
    });
  }

  alterar() {
    this.cursoService.alterar(this.id, this.cursoForm.value).subscribe(curso => {
      if (curso) {
        this.router.navigate(['/curso']);
        this.toastr.success('Alterado com Sucesso', '', {
          timeOut: 3000
        });
      }
    });
  }

}
