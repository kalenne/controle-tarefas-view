import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CPF'
})
export class CpfPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if(value == "") {
      return "";
    }

    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return 'error';
  }

}
