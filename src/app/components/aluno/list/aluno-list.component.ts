import { AlunoResponse } from './../model/aluno-response-model';
import { AlunoService } from './../service/aluno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {

  alunos: AlunoResponse[] = [];

  constructor(private service: AlunoService) { }

  ngOnInit(): void {
    this.buscarAlunos();
  }

  buscarAlunos() {
    this.service.getAlunos().subscribe(alunos => {
      this.alunos = alunos;
    });
  }

  deletar(id: number) {
    if (id) {
      this.service.deletar(id).subscribe(res => {
        this.buscarAlunos();
      });
    }
  }

}
