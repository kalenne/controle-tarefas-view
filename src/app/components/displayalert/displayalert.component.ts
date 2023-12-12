import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-displayalert',
  templateUrl: './displayalert.component.html',
  styleUrls: ['./displayalert.component.css']
})
export class DisplayAlertComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

}
