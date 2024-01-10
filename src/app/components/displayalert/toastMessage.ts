import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayAlertComponent } from './displayalert.component';

export abstract class ToastMessage {

  abstract abrirToastMessage(messagem: string): void;

}
