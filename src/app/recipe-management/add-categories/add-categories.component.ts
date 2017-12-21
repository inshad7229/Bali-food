import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategoryComponent } from '../../popups/add-category/add-category.component';
import { RecipeServicesService } from  '../../providers/recipe-services.service'
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {
  categoryList;
  categoryData;
  categoryIds=[];
  constructor(public dialog: MatDialog,private recipeService:RecipeServicesService) { }

  ngOnInit() {
    this.getCategoryList();
  }

  onAddCategory(): void {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
        width: '400px',
      });
    	dialogRef.afterClosed().subscribe(result => {
    	 if (result) {
         console.log(result);
         this.categoryData=result;
         this.addNewCategory();
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

  addNewCategory(){
    this.recipeService.addCategory(this.categoryData).subscribe(data=>{
      console.log(data);
      if (data.success==true) {
        this.ngOnInit();
      }
    },err=>{
      console.log(err);
    })
  }



  onCheckbox(id){
   if (this.categoryIds.indexOf(id)==-1) {
     console.log("new id")
      this.categoryIds.push(id)
      console.log(this.categoryIds)
    }else{
       console.log("id exit")
       let index=this.categoryIds.indexOf(id)
       console.log(index)
       let a=this.categoryIds.splice(index,1)
       console.log(this.categoryIds)
     }
  }

  imageUploadForGridOneIndexEvent(evt: any,) {
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
        console.log(mainImage)
      };
      fr.readAsDataURL(file);
   }

  deleteRecipe(){
    if (this.categoryIds.length==0) {
      console.log("please select atleast 1 category to delete")
      return 0;
    }else{
      console.log(this.categoryIds)
      this.recipeService.deleteRecipes(this.categoryIds).subscribe(data=>{
      console.log(data);
      if (data.success==true) {
         this.ngOnInit();
        }
      },error=>{
        console.log(error);
      })
    }
  }

}
