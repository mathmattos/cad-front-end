import { Curso } from '../../curso/model/curso-model';

export class AlunoResponse {

    constructor(
        public id?: number,
        public nome?: string,
        public rg?: string,
        public ra?: string,
        public serie?: string,
        public cidade?: string,
        public curso?: Curso
    ) {}

}
