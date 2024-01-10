import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';
import { MatRippleModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DATE_TIME_FORMAT } from 'src/app/utils/DATE_TIME_FORMAT';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule],
  exports: [
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatRippleModule,
    NgxMatMomentModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT },
  ],
})
export class MaterialModule {}
