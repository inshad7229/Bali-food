import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { MatSnackBar } from '@angular/material';
import { PasswordDialogComponent } from '../dialogs/password-dialog/password-dialog.component';
import { UserManagementService } from '../user-mangement/user-management.service'


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  providers:[UserManagementService]
})
export class DeleteUserComponent implements OnInit {
userData
progressBar
userid
mode = 'indeterminate';
userDetails;
input
  constructor(private userManagementService:UserManagementService,public dialog: MatDialog,private snackBar:MatSnackBar) { }

  ngOnInit() {
  	this.getUserList()
  }


   getUserList(){
     this.progressBar=true;
     this.userManagementService.getUserData()
      .subscribe(data =>{
        this.userData=data.users;
        this.userDetails=this.userData;
        // alert (JSON.stringify(this.userDetails))
        this.progressBar=false;
     }),error=>{
        this.progressBar=false;
      }
    }

  onDelete(id){
    this.progressBar=true;
    this.userid=id;
    this.userManagementService.deleteUser(this.userid).subscribe(data=>{
      this.getUserList()
      this.progressBar=false;
      this.openSnackBar('User Successfully deleted','');
    }),error=>{
      this.progressBar=false
    }
  }


   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog(id): void {
     this.userid=id._id;
     console.log("open" +  this.userid)
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { id: this.userid}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed'+ JSON.stringify(result));
      this.userid = result.id;
      console.log(this.userid)
       if (this.userid) {
        this.onDelete(this.userid)
       }
      }
    }); 
  }

  searchUsers() {
     
        // Reset items back to all of the items
        if (this.input=='') {
          this.userData=this.userDetails;
          return
        }
        // set val to the value of the searchbar
        let val = this.input;
        console.log(val);

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.userData = this.userDetails.filter((value) => {
             return (value.email.toUpperCase().indexOf(val.toUpperCase()) > -1 || value.username.toUpperCase().indexOf(val.toUpperCase()) > -1 || value._id.toUpperCase().indexOf(val.toUpperCase()) > -1 );
          })
        }
     
     
     
  }

}
