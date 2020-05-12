import { Aluno } from './../model/aluno-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Curso } from '../../curso/model/curso-model';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private httpClient: HttpClient) {}

  getAlunos(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(environment.baseApi + '/aluno');
  }

  findById(id): Observable<Aluno> {
    return this.httpClient.get<Aluno>(environment.baseApi + '/aluno/' + id);
  }

  salvar(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(environment.baseApi + '/aluno', aluno);
  }

  alterar(id: number, alunoEditado: Aluno): Observable<Aluno> {
    return this.httpClient.put<Aluno>(environment.baseApi + '/aluno/' + id, alunoEditado);
  }

  deletar(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.baseApi + '/aluno/' + id);
  }

  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.baseApi + '/curso');
  }

}
