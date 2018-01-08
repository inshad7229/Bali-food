import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { GeneralmanagementService } from '../providers/generalmanagement.service';
import { AddFaqComponent } from '../popups/add-faq/add-faq.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationBoxComponent } from '../popups/confirmation-box/confirmation-box.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers:[GeneralmanagementService]
})
export class FaqComponent implements OnInit {

	faqList;
	loading=false
  constructor(public toastr: ToastsManager, vRef: ViewContainerRef,public dialog: MatDialog,private generalmanagementService:GeneralmanagementService) {
  	this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
  	this.getFaqList();
  }

 	getFaqList(){
 		this.loading=true;
 		this.generalmanagementService.getFaq().subscribe(data=>{
 			this.faqList=data.data;
 			console.log(this.faqList)
 			this.loading=false
 		},err=>{
 			console.log(err);
 		})
 	}

 	onAddFaq(): void {
	    let dialogRef = this.dialog.open(AddFaqComponent, {
	        width: '400px',
	      });
	    	dialogRef.afterClosed().subscribe(result => {
	    	 if (result) {
	         console.log(result);
	         this.addFaq(result);
	       }
	    }); 
 	}


 	addFaq(faqData){
 		this.generalmanagementService.addFaq(faqData).subscribe(data=>{
 			if (data.success==true) {
 				this.getFaqList();
 			}
 		},err=>{
 			console.log(err)
 		})
 	}

 	onDelete(faq){
		let dialogRef = this.dialog.open(ConfirmationBoxComponent, {
	        width: '400px',
	        data:{message:"FaqDelete"}
	      });
	    	dialogRef.afterClosed().subscribe(result => {
	    	 if (result) {
	        	 console.log(result);
	        	 if (result=="yes") {
	        	 	this._deleteFunction(faq._id);
	        	 }
	         	
	       }
	    }); 
 	}

 	_deleteFunction(id){
 		this.generalmanagementService.deleteFaq(id).subscribe(data=>{
 			console.log(data)
 			if(data.success==true){
 				 this.toastr.success('FAQ Successfully deleted', 'Success!');
 				 this.getFaqList();
 			}
 		},err=>{
 			console.log(err);
 		})
 	}

 	onEdit(faq){
 		let dialogRef = this.dialog.open(AddFaqComponent, {
	        width: '400px',
	        data:faq
	      });
	    	dialogRef.afterClosed().subscribe(result => {
	    	 if (result) {
	         console.log(result);
	         this._editFunction(result);
	       }
	    }); 
 	}


 	_editFunction(faqData){
 		this.generalmanagementService.editFaq(faqData).subscribe(data=>{
 			if (data.success==true) {
 				this.toastr.success('FAQ Successfully Updated', 'Success!');
 				this.getFaqList();
 			}
 		},err=>{
 			console.log(err)
 		})
 	}

}
