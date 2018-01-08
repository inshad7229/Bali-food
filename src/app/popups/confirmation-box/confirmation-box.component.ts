import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {
	message
  constructor(public dialogRef: MatDialogRef<ConfirmationBoxComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
  	this.message=this.data.message
  }

  ngOnInit() {
  }

  onYes(){
  	this.dialogRef.close("yes");
  }
  
  onCancel(){
  	this.dialogRef.close();
  }

}
