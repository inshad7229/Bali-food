import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { RecipeServicesService } from '../../providers/recipe-services.service';
import { ConfirmationBoxComponent } from '../../popups/confirmation-box/confirmation-box.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-comment-management',
  templateUrl: './comment-management.component.html',
  styleUrls: ['./comment-management.component.scss']
})
export class CommentManagementComponent implements OnInit {
	loading
	recipeList;
	commentId;
	RecipeId;
  constructor( vRef: ViewContainerRef,public dialog: MatDialog,private recipeService:RecipeServicesService,public toastr: ToastsManager) {
  		this.toastr.setRootViewContainerRef(vRef);
   }

  ngOnInit() {
  	this.getRecipesList();
  }


  getRecipesList(){
    this.loading=true;
    this.recipeService.getAllRecipes().subscribe(data=>{
      if (data.success=true) {
        this.recipeList=data.Recipes;
        this.loading=false;
      }
    },err=>{
      console.log(err);
    })
  }

  onDelete(commentId,RecipeId){
  	this.commentId=commentId;
  	this.RecipeId=RecipeId;
  	let dialogRef = this.dialog.open(ConfirmationBoxComponent, {
            width: '300px',
            data:{ message:"forDeleteCategory"}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="yes") {
               // this._categoryDeletionFunction();
               console.log("comment delete");
               this._deleteComment();
            }
          }
        });
  }

  _deleteComment(){
  	this.recipeService.deleteComment(this.commentId,this.RecipeId).subscribe(data=>{
  		 this.toastr.success('comment Successfully deleted', 'success!');
  		this.getRecipesList();
  	},err=>{
  		console.log(err);
  	})
  }

}
