import { AlunoService } from './../service/aluno.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from '../../curso/model/curso-model';
import { CursoService } from '../../curso/service/curso.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {

  alunoForm: FormGroup;
  id: number;
  isDetail: boolean;
  cursos: Curso[] = [];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private service: AlunoService,
              private toastr: ToastrService,
              private cursoService: CursoService) { }

  ngOnInit(): void {
    const urls = this.route.snapshot.url;
    this.id = this.route.snapshot.params.id;
    this.isDetail = urls[0].path === 'detail';
    this.populaComboCursos();
    this.inicializaFormulario();
    this.preencheCamposParaEdicao();
    if (this.isDetail) {
      this.alunoForm.disable();
    }
  }

  inicializaFormulario() {
    this.alunoForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(30)]],
      rg: [null, [Validators.required, Validators.maxLength(9)]],
      ra: [null, [Validators.required, Validators.maxLength(8)]],
      serie: [null, [Validators.required, Validators.maxLength(20)]],
      cidade: [null, [Validators.required, Validators.maxLength(50)]],
      cursoId: [null, Validators.required]
    });
  }

  populaComboCursos() {
    this.cursoService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
  }



  preencheCamposParaEdicao() {
    if (this.id) {
      this.service.findById(this.id).subscribe(aluno => {
        if (aluno) {
          this.alunoForm.setValue({
            id: aluno.id,
            nome: aluno.nome,
            rg: aluno.rg,
            ra: aluno.ra,
            serie: aluno.serie,
            cidade: aluno.cidade,
            cursoId: aluno.idCurso
          });
        }
      });
    }
  }

  submeteFormulario() {
    if (this.alunoForm.valid) {
      if (this.id) {
        this.alterar();
      } else {
        this.salvar();
      }
      this.alunoForm.reset();
    } else {
      this.toastr.error('Existem campos obrigatórios', '', {
        timeOut: 3000
      });
    }
  }

  salvar() {
    this.service.salvar(this.alunoForm.value).subscribe(aluno => {
      if (aluno) {
        this.router.navigate(['/aluno']);
        this.toastr.success('Salvo com Sucesso', '', {
          timeOut: 3000
        });
      }
    });
  }

  alterar() {
    this.service.alterar(this.id, this.alunoForm.value).subscribe(aluno => {
      if (aluno) {
        this.router.navigate(['/aluno']);
        this.toastr.success('Alterado com Sucesso', '', {
          timeOut: 3000
        });
      }
    });
  }

}
