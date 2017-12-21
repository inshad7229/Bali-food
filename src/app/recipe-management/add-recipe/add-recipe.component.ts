import { Component, OnInit } from '@angular/core';
import { IngredientsComponent } from '../../popups/ingredients/ingredients.component';
import { InstructionsComponent } from '../../popups/instructions/instructions.component';
import { SelectUserComponent } from '../../popups/select-user/select-user.component'
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecipeServicesService } from '../../providers/recipe-services.service'
import { RecipeModel } from './add-recipe.model.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SpecificUsersComponent } from '../../popups/specific-users/specific-users.component'

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})

export class AddRecipeComponent implements OnInit {
  complexForm: FormGroup;
  ingredients;
  instructions;
  mainImage;
  recipeImages=[];
  recipeVideos;
  categoryList;
  recipeModel: RecipeModel = new RecipeModel ();

  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,private recipeService:RecipeServicesService, private domSanitizer:DomSanitizer) { 
      this.complexForm = formBuilder.group({
        'title': [null, Validators.compose([Validators.required])],
        'level': [null, Validators.compose([Validators.required])],
        'mealType':[null, Validators.compose([Validators.required])],
        'description':[null,Validators.compose([Validators.required])],
        'ingredients':[null,Validators.compose([Validators.required])],
        'instructions':[null,Validators.compose([Validators.required])],
        'category':[null,Validators.compose([Validators.required])]
      })
  }


  ngOnInit() {
    this.getCategoryList();
  }

  addIngredient(): void {
    let dialogRef = this.dialog.open(IngredientsComponent, {
        width: '350px',
      });
    	dialogRef.afterClosed().subscribe(result => {
    	 if (result) {
         console.log(result);
         this.recipeModel.ingredients=result;
         this.ingredients=result.toString();
         console.log(this.ingredients)
       }
    }); 
  }

  getCategoryList(){
    this.recipeService.getCategories().subscribe(data=>{
      console.log(data);
      this.categoryList=data.data;
    },err=>{
      console.log(err);
    })
  }

  addInstructions():void {
    let dialogRef = this.dialog.open(InstructionsComponent, {
        width: '350px',
      });
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log(result);
         this.recipeModel.instructions=result;
         this.instructions=result.toString();
       }
    }); 
  }

  onPostAs(){
    let dialogRef = this.dialog.open(SelectUserComponent, {
        width: '450px',
      });
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
        if (result=="admin") {
          this.onPostAsAdmin();
        }else if (result=="user") {
          this.onPostToSpecificUser()
        }
       }
    }); 
  }

  onAddRecipe(){
    this.recipeService.addRecipe(this.recipeModel).subscribe(data=>{
      console.log(data)
    },err=>{
      console.log(err);
    })
  }

  onMainImage(event){
    this.imageToBase64(event);
    let tmppath = URL.createObjectURL(event.target.files[0]);
    this.mainImage=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
    console.log(this.mainImage)
  }

  onDeleteMainImage(){
    this.mainImage=""
  }

  onRecipeImages(event){
    console.log(event);
    for (var i = 0; i < event.target.files.length; i++) {
      let tmppath = URL.createObjectURL(event.target.files[i]);
      this.recipeImages.push(this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath));

    }
    console.log(this.recipeImages);
  }

  onDeleteRecipeImages(Index){
    this.recipeImages.splice(Index,1);
  }

  onRecipeVideo(event){
    let tmppath = URL.createObjectURL(event.target.files[0]);
    this.recipeVideos=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
    console.log(tmppath);
  }
  

  onReset(){

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
      let mainImage = fr.result;
      this.recipeModel.mainImage=mainImage;
      console.log(mainImage)
    };
    fr.readAsDataURL(file);
  }

  onPostAsAdmin(){
    this.recipeModel.email="admin@admin.com";
    this.recipeModel.userName="Admin";
    this.addRecipe();
  }

  onPostToSpecificUser(){
    let dialogRef = this.dialog.open(SpecificUsersComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log(result);
         this.recipeModel.email=result.email;
         this.recipeModel.userName=result.username;
         this.recipeModel.user_id=result._id;
         this.addRecipe();
       }
    });
  }

  addRecipe(){
    this.recipeService.addRecipe(this.recipeModel).subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err)
    })
  }


 
}
