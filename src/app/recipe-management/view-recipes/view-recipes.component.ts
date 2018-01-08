import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router,RouterLinkActive } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserlistComponent } from '../../popups/userlist/userlist.component';
import { RecipeServicesService } from  '../../providers/recipe-services.service'
import { DomSanitizer } from '@angular/platform-browser';
import { SpecificUsersComponent } from '../../popups/specific-users/specific-users.component'
import { AppProvider } from '../../providers/app';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfirmationBoxComponent } from '../../popups/confirmation-box/confirmation-box.component'

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss']
})

export class ViewRecipesComponent implements OnInit {
  recipeList;
  loading=false;
  noRecipeDiv=false;
  recipeIds=[];
  p: number = 1;
  deleteButton=false
  constructor(public toastr: ToastsManager, vRef: ViewContainerRef,private appProvider:AppProvider,private domSanitizer:DomSanitizer,private router:Router,public dialog: MatDialog,private recipeService:RecipeServicesService) { 
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.getRecipesList()
  }

  onRecipe(data){
    console.log(data);
    this.appProvider.current.recipeData=data;
  	this.router.navigate(["/dashboard/recipeMangement"])
  }

  onViewUsers(): void {
    let dialogRef = this.dialog.open(UserlistComponent, {
          width: '600px',
        });
      	dialogRef.afterClosed().subscribe(result => {

      }); 
  }

  getRecipesList(){
    this.loading=true;
    this.noRecipeDiv=false;
    this.recipeService.getAllRecipes().subscribe(data=>{
      if (data.success=true) {
        this.recipeList=data.Recipes;
        this.loading=false;
      }
    },err=>{
      console.log(err);
    })
  }

  getSafeContent(image){
    if (image) {
      if (image==null||image=='null') {
        return "http://placehold.it/100x100"
      }else{
        return this.domSanitizer.bypassSecurityTrustUrl(image);
      }
    }else{
      return "http://placehold.it/100x100"
    }
  }

  getValue(value){
    if (value) {
      if(value==null||value=='null'){
       return '--'
      }else{
        return value
      }
    }
    else{
      return '--'
    }
  }

  onSearchByUser(){
    let dialogRef = this.dialog.open(SpecificUsersComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log(result);
         this.recipeList=this.recipeList.filter(f=>(f.userName == result.username))
         if (this.recipeList.length==0) {
           console.log("noRecipe");
           this.noRecipeDiv=true;
         }
       }
    });
  }

  onCheckbox(id){
   if (this.recipeIds.indexOf(id)==-1) {
     console.log("new id")
      this.recipeIds.push(id);
      console.log(this.recipeIds)
    }else{
       console.log("id exit")
       let index=this.recipeIds.indexOf(id)
       console.log(index)
       let a=this.recipeIds.splice(index,1)
       console.log(this.recipeIds)
     }

  }

  deleteRecipe(){
    if (this.recipeIds.length==0) {
       this.toastr.error('please select atleast 1 recipe for deletion', 'Oops!');
      return 0;
    }else{
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
  }
  onEditRecipe(recipe){
    this.router.navigate(["/dashboard/addRecipe/"+recipe._id])
  }

  _recipeDeletionFunction(){
    console.log(this.recipeIds)
      this.recipeService.deleteRecipes(this.recipeIds).subscribe(data=>{
      console.log(data);
      if (data.success==true) {
          this.toastr.success('Recipe Deleted Successfully', 'Success!');
         this.ngOnInit();
        }
      },error=>{
        console.log(error);
      })
  }

}
