import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumdisplay'
})
export class EnumdisplayPipe implements PipeTransform {

  transform(value: any, enumType: any): string {
    if (!value || !enumType) {
      return '';
    }

    return enumType[value] || '';
  }

}
