import { Pipe, PipeTransform } from '@angular/core';
import { RolesEnum, TipoStatusEnum } from 'src/app/enums/controle.enum';

@Pipe({
  name: 'enumdisplay',
})
export class EnumdisplayPipe implements PipeTransform {
  transform(value: any, enumType: any): string {
    if (!value || !enumType) {
      return '';
    }

    if (enumType === 'roles') {
      if (value == RolesEnum.ROLE_ADMIN) return 'ADMIN';
      if (value == RolesEnum.ROLE_USER) return 'USER';
    }

    if (enumType === 'TipoStatusEnum') {
      if (value === TipoStatusEnum.EM_ANDAMENTO) return 'EM ANDAMENTO';
    }

    return value;
  }
}
