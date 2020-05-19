export default class DataUtil {

    static dateInputAsString(data: { day: number, month: number, year: number }): any {
        if (data && data.year) {
          return data ? data.year + '-' + data.month + '-' + data.day : null;
        } else {
          return data;
        }
      }

      static stringAsDateInput(dataHora: string): { day: number, month: number, year: number } {
        if (dataHora) {
          const data = dataHora.split('T')[0];
          const dataVetor: any = data.split('-');
          return { day: +dataVetor[2], month: +dataVetor[1], year: +dataVetor[0] };
        }
        return null;
      }

      static compararDataHora(dataInicio: any, dataFim: any): boolean {
        if (dataInicio && dataFim && dataInicio.length >= 8 && dataFim.length >= 8) {
          const dtInicio = dataInicio.split('-');
          const dtFim = dataFim.split('-');
          dataInicio = new Date(
            dtInicio[0],
            dtInicio[1],
            dtInicio[2]),

          dataFim = new Date(
            dtFim[0],
            dtFim[1],
            dtFim[2])

          if (dataInicio > dataFim) {
            return false;
          }
          return true;
        }
      }

}