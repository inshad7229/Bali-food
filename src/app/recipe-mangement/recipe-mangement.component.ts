import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild,ViewContainerRef} from '@angular/core';
import { AppProvider } from '../providers/app'
import { DomSanitizer } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material';
import { RecipeServicesService } from '../providers/recipe-services.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationBoxComponent } from '../popups/confirmation-box/confirmation-box.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-recipe-mangement',
  templateUrl: './recipe-mangement.component.html',
  styleUrls: ['./recipe-mangement.component.scss'],
  providers:[]
})
export class RecipeMangementComponent implements OnInit  {
recipeData
recipeId=[]
  constructor(public toastr: ToastsManager, vRef: ViewContainerRef,private router:Router,public dialog: MatDialog,private snackBar:MatSnackBar,private recipeServices:RecipeServicesService,private appProvider:AppProvider,private domSanitizer:DomSanitizer) { 
  	this.toastr.setRootViewContainerRef(vRef);
    if (this.appProvider.current.recipeData) {
  		this.recipeData=this.appProvider.current.recipeData;
       this.recipeId.push(this.recipeData._id)
  	}
  }

 ngOnInit() {
    
  }

  getSafeContent(img){
    let url=this.domSanitizer.bypassSecurityTrustResourceUrl(img);
    return url;
  }

  onDelete(){
    let dialogRef = this.dialog.open(ConfirmationBoxComponent, {
            width: '300px',
            data:{ message:"forDeleteRecipe"}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="yes") {
               this._recipeDeletionFunction();
            }
          }
        });
  }

  _recipeDeletionFunction(){
    this.recipeServices.deleteRecipes(this.recipeId).subscribe(data=>{
      console.log(data);
      this.toastr.success('Recipe Successfully deleted', 'Success!');
       this.router.navigate(['/dashboard/viewRecipes'])
    })
  }

 
}
