import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../model/curso-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {


  constructor(private httpClient: HttpClient) { }

  findById(id): Observable<Curso> {
    return this.httpClient.get<Curso>(environment.baseApi + '/curso/' + id);
  }

  salvar(curso: Curso): Observable<Curso> {
    return this.httpClient.post<Curso>(environment.baseApi + '/curso', curso);
  }

  alterar(id: number, cursoEditado: Curso): Observable<Curso> {
    return this.httpClient.put<Curso>(environment.baseApi + '/curso/' + id, cursoEditado);
  }

  deletar(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.baseApi + '/curso/' + id);
  }

  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.baseApi + '/curso');
  }

  getTotalCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.baseApi + '/curso/total');
  }


  getPageCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.baseApi + '/curso/page');
  }




}
