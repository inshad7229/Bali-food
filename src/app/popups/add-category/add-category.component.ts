import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
	categoryNameEnglish;
	categoryNameHerbew;
	categoryPlaceHolderImage;
	categoryImageToUpload;
	complexForm: FormGroup;
	categoryId;
	showError=false
  	constructor(private formBuilder: FormBuilder,private domSanitizer:DomSanitizer,public dialogRef: MatDialogRef<AddCategoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
  		this.complexForm = formBuilder.group({
	      'categoryNameEnglish': [null, Validators.compose([Validators.required])],
	      'categoryNameHerbew': [null, Validators.compose([Validators.required])],
	      // 'categoryImg': [null, Validators.compose([Validators.required])]
	    })

	    if (data) {
	    	this.categoryNameEnglish=data.categoryName;
	    	this.categoryNameHerbew=data.categoryNameHerbew;
	    	this.categoryPlaceHolderImage=data.categoryImage;
	    	this.categoryId=data._id;
	    }
  	}

 	ngOnInit() {

 	}

	onSubmit(){
		if (!this.categoryPlaceHolderImage) {
			if(!this.categoryImageToUpload){
				this.showError=true;
				return;
			}else{
				let categoryData ={
					categoryName:this.categoryNameEnglish,
					categoryNameHerbew:this.categoryNameHerbew,
					categoryImage:this.categoryImageToUpload
				}
		 		this.dialogRef.close(categoryData);
			}
		}else{
			if (!this.categoryImageToUpload) {
				let categoryData ={
					id:this.categoryId,
					categoryName:this.categoryNameEnglish,
					categoryNameHerbew:this.categoryNameHerbew,
				}
			 	this.dialogRef.close(categoryData);
			}else{
				let categoryData ={
					id:this.categoryId,
					categoryName:this.categoryNameEnglish,
					categoryNameHerbew:this.categoryNameHerbew,
					categoryImage:this.categoryImageToUpload
				}
		 		this.dialogRef.close(categoryData);
			}
		}
	}

	onCategoryImage(event){
		this.showError=false
	    this.imageToBase64(event);
	    let tmppath = URL.createObjectURL(event.target.files[0]);
	    this.categoryPlaceHolderImage=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
	    console.log(this.categoryPlaceHolderImage)
  	}

  	imageToBase64(evt: any) {
	    if (!evt.target) {
	        return;
	    }
	    if (!evt.target.files) {
	        return;
	    }
	    if (evt.target.files.length !== 1) {
	        return;
	    }
	    const file = evt.target.files[0];
	    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
	        return;
	    }
	    const fr = new FileReader();
	    fr.onloadend = (loadEvent) => {
	      let categoryImage = fr.result;
	      this.categoryImageToUpload=categoryImage;
	      console.log(categoryImage)
	    };
	    fr.readAsDataURL(file);
  	}
}
