import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { MatSnackBar } from '@angular/material';
import { Router,RouterLinkActive } from '@angular/router';
import { PasswordDialogComponent } from '../dialogs/password-dialog/password-dialog.component'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  template;
  activeUser;
  constructor(private router: Router,public dialog: MatDialog,private snackBar:MatSnackBar) { }

  ngOnInit() {
   //  alert(this.router.url)
   // if (this.router.url=="/home" ||this.router.url=="/edit-admin") {
   //     this.activeUser='in'
     
   //  }else{
   //    this.activeUser=' '
   //  }
  }

  openDialog(flag): void {
    if (flag=='delete') {
      // code...
        let dialogRef = this.dialog.open(PasswordDialogComponent, {
          width: '350px',
        });
      	dialogRef.afterClosed().subscribe(result => {
      	  if (result) {
      	    console.log('The dialog was closed'+ JSON.stringify(result));
             this.activeUser='active';
             // alert(this.activeUser)
      	    this.router.navigate(['/dashboard/deleteUser'],{ skipLocationChange: true });
      	}
      }); 
    }else{
       this.activeUser=' '
    }
  }
}
