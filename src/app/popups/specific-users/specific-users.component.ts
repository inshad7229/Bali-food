import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserManagementService } from '../../user-mangement/user-management.service'
@Component({
  selector: 'app-specific-users',
  templateUrl: './specific-users.component.html',
  styleUrls: ['./specific-users.component.scss'],
  providers:[UserManagementService]
})
export class SpecificUsersComponent implements OnInit {
   userData
   activeAccounts
   input;
   userDetails
   constructor(private userManagementService:UserManagementService,public dialogRef: MatDialogRef<SpecificUsersComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  	this.getUserList();
  }

 getUserList(){
   this.userManagementService.getUserData()
    .subscribe(data =>{
      this.userData=data.users;
      this.activeAccounts = this.userData.filter(f=>f.status !='deactive');
      this.userDetails=this.userData;
   	}),error=>{
      console.log(error)
    }
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
         return (value.email.toUpperCase().indexOf(val.toUpperCase()) > -1 || value.username.toUpperCase().indexOf(val.toUpperCase()) > -1 );
      })
    }
  }

  selectedUser(userData){
  	this.dialogRef.close(userData);
  }

}
