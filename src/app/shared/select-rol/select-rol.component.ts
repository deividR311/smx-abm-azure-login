import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-rol',
  templateUrl: './select-rol.component.html',
  styleUrls: ['./select-rol.component.scss']
})
export class SelectRolComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SelectRolComponent>) { }

  closeDialog(rol: any): void {
    this.dialogRef.close(rol);
  }

}
