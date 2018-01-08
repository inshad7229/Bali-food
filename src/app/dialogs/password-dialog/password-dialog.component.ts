import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
password;
errDiv=false;
agree=false;
  constructor(private snackBar:MatSnackBar,public dialogRef: MatDialogRef<PasswordDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      if (data.from=="deletecategory") {
        this.agree=true;
      }
    }
   }

  ngOnInit() {
  }

  onContinue(){
    this.agree=true
  }

  onSubmit(){
  	if (this.password == localStorage['password']) {
  		this.dialogRef.close("yes");
  	}
  	else{
      this.errDiv=true
  		// this.openSnackBar("You have enetered wrong password","")
  		// this.onCancel();
  	}
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  onCancel(){
  	this.dialogRef.close();
  }
}
