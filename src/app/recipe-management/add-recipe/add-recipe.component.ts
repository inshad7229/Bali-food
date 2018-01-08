import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { IngredientsComponent } from '../../popups/ingredients/ingredients.component';
import { InstructionsComponent } from '../../popups/instructions/instructions.component';
import { SelectUserComponent } from '../../popups/select-user/select-user.component'
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecipeServicesService } from '../../providers/recipe-services.service'
import { RecipeModel } from './add-recipe.model.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SpecificUsersComponent } from '../../popups/specific-users/specific-users.component'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SuccessComponent} from '../../dialogs/success/success.component'
import { MatSnackBar } from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})

export class AddRecipeComponent implements OnInit {
  complexForm: FormGroup;
  ingredients=[];
  instructions=[];
  mainImage;
  recipeImages=[];
  recipeVideos;
  recipeVideoToUpload;
  categoryList;
  recipeModel: RecipeModel = new RecipeModel ();
  recipeImagesToUpload=[];
  duration= {hour: 13, minute: 30};
  removable: boolean = true;
  recipeId;
  durationValidation=false;
  indexToEditMultipleImages;
  id
  imagechagestatus:boolean=false
  constructor(private snackBar:MatSnackBar,public toastr: ToastsManager, private route: ActivatedRoute, vRef: ViewContainerRef,public dialog: MatDialog,private formBuilder: FormBuilder,private recipeService:RecipeServicesService, private domSanitizer:DomSanitizer) { 
      this.toastr.setRootViewContainerRef(vRef);
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id ) {
        alert(this.id)
        this.onGetRecipe()
      }
      this.complexForm = formBuilder.group({
        'title': [null, Validators.compose([Validators.required])],
        'level': [null, Validators.compose([Validators.required])],
        'duration': [null, Validators.compose([Validators.required])],
        'mealType':[null, Validators.compose([Validators.required])],
        'description':[null,Validators.compose([Validators.required])],
        // 'ingredients':[null,Validators.compose([Validators.required])],
        // 'instructions':[null,Validators.compose([Validators.required])],
        'category':[null,Validators.compose([Validators.required])]
      })
  }

  onDuration(){
    console.log(this.duration);
    this.recipeModel.duration=this.duration.hour+":"+this.duration.minute
    console.log(this.recipeModel.duration)
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
         for(var i = 0; i < result.length; i++) {
           this.ingredients.push(result[i]);
         }
         console.log(this.ingredients)
       }
    }); 
  }

  remove(ingredient: any): void {
    let index = this.ingredients.indexOf(ingredient);
    if (index >= 0) {
      this.ingredients.splice(index, 1);
      console.log(this.ingredients)
    }
  }

  removeInstructions(instruction:any): void {
    let index = this.instructions.indexOf(instruction);
    if (index >= 0) {
      this.instructions.splice(index, 1);
      console.log(this.instructions)
    }
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
         for(var i = 0; i < result.length; i++) {
           this.instructions.push(result[i]);
         }
       }
    }); 
  }

  onPostAs(){
    let dialogRef = this.dialog.open(SelectUserComponent, {
        width: '450px',
        data:{ message:"from login" ,user:this.recipeModel.user_id,email:this.recipeModel.email}
      });
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
        if (result=="admin") {
          this.onPostAsAdmin();
        }else if (result=="user") {
          this.onPostToSpecificUser(this.recipeModel.user_id,this.recipeModel.email)
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
      const file = event.target.files[i];
      const fr = new FileReader();
      fr.onloadend = (loadEvent) => {
        let images = fr.result;
        this.recipeImagesToUpload.push(images);
        console.log(this.recipeImagesToUpload)
      };
      fr.readAsDataURL(file);
    }
    // console.log(this.recipeImages);
  }


  onDeleteRecipeImages(Index){
    this.recipeImages.splice(Index,1);
    this.recipeImagesToUpload.splice(Index,1);
  }

  onDeleteRecipeVideo(){
    this.recipeVideos="";
  }


  onRecipeVideo(event){
    let tmppath = URL.createObjectURL(event.target.files[0]);
    this.recipeVideos=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
    console.log(tmppath);
    let files = [].slice.call(event.target.files);
    this.recipeVideoToUpload=files;
    this.imagechagestatus=true
    console.log(this.recipeVideoToUpload[0]);
  }
  
  onResetButton(){
    this.ingredients=[];
    this.instructions=[];
    this.recipeImagesToUpload=[];
    this.recipeImages=[];
    this.recipeVideos="";
    this.mainImage=""
    this.complexForm.reset();
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
    this.recipeModel.duration=this.duration.hour+":"+this.duration.minute
    this.recipeModel.email="admin@admin.com";
    this.recipeModel.userName="Admin";
    this.recipeModel.ingredients=this.ingredients;
    this.recipeModel.instructions=this.instructions;
    if (this.recipeImagesToUpload.length>0) {
      this.recipeModel.recipeImages=this.recipeImagesToUpload;
    }
    if (this.id) {
      this.editRecipe();
    }else{
        this.addRecipe();
      
    }
  }

  onPostToSpecificUser(userid?,email?){
    let dialogRef = this.dialog.open(SpecificUsersComponent, {
        width: '500px',
        data:{userid:userid,email:email}
      });
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log(result);
         this.recipeModel.email=result.email;
         this.recipeModel.userName=result.username;
         this.recipeModel.user_id=result._id;
         this.recipeModel.ingredients=this.ingredients;
         this.recipeModel.instructions=this.instructions;
         this.recipeModel.duration=this.duration.hour+":"+this.duration.minute;
         if (this.recipeImagesToUpload.length>0) {
            this.recipeModel.recipeImages=this.recipeImagesToUpload;
          }
         if (this.id) {
          this.editRecipe();
        }else{
            this.addRecipe();
          
        }
       }
    });
  }

  addRecipe(){
    this.recipeService.addRecipe(this.recipeModel).subscribe(data=>{
      console.log(data);
      if (data.success==true) {
          this.recipeId=data.recipeData._id;
          if (this.recipeVideos) {
            let formData: FormData = new FormData();
            formData.append('video', this.recipeVideoToUpload[0]);
            this.recipeService.addRecipeVideo(this.recipeId,formData).subscribe(data=>{
              console.log(data);
              if (data.success==true) {
                this.toastr.success('Recipe Successfully Added', 'Success!');
                this.onResetButton();
              }
            },err=>{
              console.log("error while uploading video"+err);
            })
          }else{
            this.toastr.success('Recipe Successfully Added', 'Success!');
            this.onResetButton();
          }
         
      }else{
        this.toastr.error('some problem occured please try again later', 'Oops!');
      }
    },err=>{
       this.toastr.error('some problem occured please try again later', 'Oops!');
       console.log(err);
    })
  }

  editRecipe(){
     console.log(this.recipeModel)
    this.recipeService.editRecipe(this.recipeModel,this.id).subscribe(data=>{
      console.log(data);
      if (data.success==true) {
          this.recipeId=this.id;
          if (this.imagechagestatus==true) {
            let formData: FormData = new FormData();
            formData.append('video', this.recipeVideoToUpload[0]);
            this.recipeService.addRecipeVideo(this.recipeId,formData).subscribe(data=>{
              console.log(data);
              if (data.success==true) {
                this.toastr.success('Recipe Successfully Updated', 'Success!');
                this.onResetButton();
              }
            },err=>{
              console.log("error while uploading video"+err);
            })
          }else{
            this.toastr.success('Recipe Successfully Update', 'Success!');
            this.onResetButton();
          }
         
      }else{
        this.toastr.error('some problem occured please try again later', 'Oops!');
      }
    },err=>{
       this.toastr.error('some problem occured please try again later', 'Oops!');
       console.log(err);
    })
  }

  timePicker(event: any){
    console.log(event.target.value)
   if (isNaN(event.target.value)) 
    {
      this.durationValidation=true;
      return false;
    }else{
      this.durationValidation=false;
    }
  }

  onEdit(ref,i){
    ref.click()
    console.log(i)
    this.indexToEditMultipleImages=i;
  }

  onEditRecipeImages(event){
    // this.recipeImages.splice(this.indexToEditMultipleImages,1);
    this.recipeImagesToUpload.splice(this.indexToEditMultipleImages,1);
    console.log(this.recipeImagesToUpload)
    let tmppath = URL.createObjectURL(event.target.files[0]);
    this.recipeImages[this.indexToEditMultipleImages]=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath)
    // this.recipeImages.push(this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath));
    const file = event.target.files[0]
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
        let images = fr.result;
        // this.recipeImagesToUpload.push(images);
        this.recipeImagesToUpload[this.indexToEditMultipleImages]=images
        console.log(this.recipeImagesToUpload)
      };
      fr.readAsDataURL(file);
  }


  onGetRecipe(){
    this.recipeService.getRecipe(this.id).subscribe(data=>{
      console.log(data)
      this.recipeModel=data.data
      this.mainImage=data.data.mainImage
      let d=data.data.duration.split(':')
      console.log(d)
      this.duration={
        hour:parseInt(d[0]),
        minute: parseInt(d[1])
      }
      this.ingredients=data.data.ingredients
      this.instructions=data.data.instructions
      this.recipeImages=data.data.recipeImages
      this.recipeVideos=data.data.videoUrl
      //this.duration.minute=parseInt(d[1])
      console.log(this.duration.hour)
    },err=>{
      console.log(err);
    })
  }
 
}
