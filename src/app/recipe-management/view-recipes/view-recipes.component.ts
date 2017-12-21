import { Component, OnInit } from '@angular/core';
import { Router,RouterLinkActive } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserlistComponent } from '../../popups/userlist/userlist.component';
import { RecipeServicesService } from  '../../providers/recipe-services.service'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss']
})

export class ViewRecipesComponent implements OnInit {
  recipeList;
  loading=false;
  constructor(private domSanitizer:DomSanitizer,private router:Router,public dialog: MatDialog,private recipeService:RecipeServicesService) { }

  ngOnInit() {
    this.getRecipesList()
  }

  onRecipe(){
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
    this.loading=true
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

}
