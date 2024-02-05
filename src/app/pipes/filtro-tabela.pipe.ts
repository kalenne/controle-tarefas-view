import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTabela'
})
export class FiltroTabelaPipe implements PipeTransform {

  transform(itens: any[], termo: string): any[] {
    if (!itens || !termo) {
      return itens;
    }

    return itens.filter(item => 
      item.titulo.toLowerCase().includes(termo.toLowerCase())
    );
  }

}
