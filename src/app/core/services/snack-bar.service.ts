import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayAlertComponent } from 'src/app/components/displayalert/displayalert.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  abrirMessagem(message: string) {
    this.snackBar.openFromComponent(DisplayAlertComponent, {
      duration: 3 * 1000,
      data: message,
    });
  }
}
