import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
	question;
	answer;
	complexForm: FormGroup;
 	faqId;
 	constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<AddFaqComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
 		this.complexForm = formBuilder.group({
	      'question': [null, Validators.compose([Validators.required])],
	      'answer': [null, Validators.compose([Validators.required])],
	    })

     if (data) {
         this.question=data.question;
         this.answer=data.answer;
         this.faqId=data._id;
     }
 	}

 	ngOnInit() {
 		
  }

	onSubmit(){
    if (!this.faqId) {
  		let faqData={
  			question:this.question,
  		  answer:this.answer
  		}
		  this.dialogRef.close(faqData);
    }else{
      let faqData={
        question:this.question,
        answer:this.answer,
        id:this.faqId
      }
      this.dialogRef.close(faqData);
    }
	}

}
