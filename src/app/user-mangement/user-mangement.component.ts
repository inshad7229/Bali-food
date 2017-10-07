import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service'
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.scss'],
  providers:[UserManagementService]
})
export class UserMangementComponent implements OnInit {
userData;
userid;
mode = 'indeterminate';
checked = false;
progressBar;
input;
userDetails;
deactiveAccounts;
activeAccounts;
deactiveAccountsDiv:boolean=false;
activeAccountDiv:boolean=false;
allUsersDiv:boolean=true;

  constructor(private userManagementService:UserManagementService,public dialog: MdDialog,private snackBar:MdSnackBar) { }

  ngOnInit() {
  	this.getUserList()
  }

  onStatusButton(id){
    this.progressBar=true;
    this.userid=id._id;
    this.userManagementService.statusChange(this.userid).subscribe(data=>{
      this.progressBar=false;
      this.getUserList()
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

 getUserList(){
   this.progressBar=true;
   this.userManagementService.getUserData()
    .subscribe(data =>{
      this.userData=data.users;
      this.deactiveAccounts = this.userData.filter(f=>f.status !='active')
      this.activeAccounts = this.userData.filter(f=>f.status !='deactive')
      if (this.allUsersDiv==true) {
        this.userDetails=this.userData;
      }
      if (this.deactiveAccountsDiv==true) {
        this.userDetails=this.deactiveAccounts;
      }
      else if (this.activeAccountDiv==true) {
        this.userDetails=this.activeAccounts;
      }
      // alert (JSON.stringify(this.userDetails))
      this.progressBar=false;
   }),error=>{
      this.progressBar=false;
    }
 }

  onDisabledAccounts(){
   this.getUserList();
   this.deactiveAccountsDiv=true;
   this.activeAccountDiv=false
   this.allUsersDiv=false;
   
  }
  onActiveAccounts(){
    this.getUserList();
    this.deactiveAccountsDiv=false;
    this.activeAccountDiv=true;
    this.allUsersDiv=false;
  }
  onAllAccounts(){
    this.getUserList();
    this.deactiveAccountsDiv=false;
    this.activeAccountDiv=false;
    this.allUsersDiv=true;
  }

  searchUsers() {
     if(this.allUsersDiv){
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
     if (this.deactiveAccountsDiv) {
       if (this.input=='') {
          this.deactiveAccounts=this.userDetails;
          return
        }
        // set val to the value of the searchbar
        let val = this.input;
        console.log(val);

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.deactiveAccounts = this.userDetails.filter((value) => {
             return (value.email.toUpperCase().indexOf(val.toUpperCase()) > -1 || value.username.toUpperCase().indexOf(val.toUpperCase()) > -1 || value._id.toUpperCase().indexOf(val.toUpperCase()) > -1 );
          })
        }
       
     }
     if (this.activeAccountDiv) {
       if (this.input=='') {
          this.activeAccounts=this.userDetails;
          return
        }
        // set val to the value of the searchbar
        let val = this.input;
        console.log(val);

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.activeAccounts = this.userDetails.filter((value) => {
             return (value.email.toUpperCase().indexOf(val.toUpperCase()) > -1 || value.username.toUpperCase().indexOf(val.toUpperCase()) > -1 || value._id.toUpperCase().indexOf(val.toUpperCase()) > -1 );
          })
        }
     }
  }

  generateReport(){
     new Angular2Csv(this.userData, 'My Report');
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




}
