import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-matc-confirm-dialog',
  templateUrl: './matc-confirm-dialog.component.html',
  styleUrls: ['./matc-confirm-dialog.component.scss']
})
export class MatcConfirmDialogComponent implements OnInit {
  dialogref: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogref.close(false);
  }
}
