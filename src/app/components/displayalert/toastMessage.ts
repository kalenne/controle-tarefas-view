import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayAlertComponent } from './displayalert.component';

export class ToastMessage {
  private snackBar: MatSnackBar | undefined;

  toastMessage(message: string): void {
    if (this.snackBar) {
      this.snackBar.openFromComponent(DisplayAlertComponent, {
        duration: 3 * 1000,
        data: message,
      });
    }
  }
}
