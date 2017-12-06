import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  userId;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
  	this.userId=this.data;
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(){
  	 this.dialogRef.close(this.userId);
  }

  onCancel(){
  	this.dialogRef.close();
  }
}
