import { Component, } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  constructor(public dialogRef: MatDialogRef<HelpComponent>) {}

}
