import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatcConfirmDialogComponent } from '@AppComponents/matc-confirm-dialog/matc-confirm-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {
  
  public isLoading = new BehaviorSubject(false);
  
  constructor(private dialog: MatDialog) { }
    openConfirmDialog(msg:any){
    return  this.dialog.open(MatcConfirmDialogComponent, {
        width: '390px',
        disableClose: true,
        data :{
          mesage : msg
        }
      });
    
  }
}


