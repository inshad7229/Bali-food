import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategoryComponent } from '../../popups/add-category/add-category.component';
import { RecipeServicesService } from  '../../providers/recipe-services.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfirmationBoxComponent } from '../../popups/confirmation-box/confirmation-box.component' 
import { SuccessComponent} from '../../dialogs/success/success.component';
import { PasswordDialogComponent } from '../../dialogs/password-dialog/password-dialog.component'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {
  categoryList;
  categoryData;
  categoryIds=[];
  loading=false;
  categoryId;
  constructor(private domSanitizer:DomSanitizer,public toastr: ToastsManager, vRef: ViewContainerRef,public dialog: MatDialog,private recipeService:RecipeServicesService) {
   this.toastr.setRootViewContainerRef(vRef);
  }

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
    this.loading=true;
    this.recipeService.getCategories().subscribe(data=>{
      if (data.success=true) {
        console.log(data);
        this.categoryList=data.data;
        this.loading=false;
      }
    },err=>{
      console.log(err);
    })
  }

  addNewCategory(){
    this.recipeService.addCategory(this.categoryData).subscribe(data=>{
      console.log(data);
      if (data.success==true) {
        this.getCategoryList();
      }
    },err=>{
      console.log(err);
    })
  }

  getSafeContent(image){
    return this.domSanitizer.bypassSecurityTrustUrl(image);
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

  // deleteRecipe(){
  //   if (this.categoryIds.length==0) {
  //      this.toastr.error('please select atleast 1 category for deletion', 'Oops!');
  //     return 0;
  //   }else{
  //      let dialogRef = this.dialog.open(ConfirmationBoxComponent, {
  //           width: '300px',
  //           data:{ message:"forDeleteCategory"}
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //         if (result) {
  //           if (result=="yes") {
  //              // this._categoryDeletionFunction();
  //              this.passwordDialog();
  //           }
  //         }
  //       });
  //   }
  // }


  // passwordDialog(){
  //    let dialogRef = this.dialog.open(PasswordDialogComponent, {
  //           width: '300px',
  //           data:{ from:"deletecategory"}
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //         if (result) {
  //           if (result=="yes") {
  //             this._categoryDeletionFunction();
  //           }
  //         }
  //       });
  // }
  

  // _categoryDeletionFunction(){
  //   console.log(this.categoryIds)
  //     this.recipeService.deleteCategories(this.categoryIds).subscribe(data=>{
  //     console.log(data);
  //     if (data.success==true) {
  //        this.ngOnInit();
  //       }
  //     },error=>{
  //       console.log(error);
  //     })
  // }

  onEdit(categoryData){
    console.log(categoryData);
    let dialogRef = this.dialog.open(AddCategoryComponent, {
        width: '400px',
        data:categoryData
      });
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log(result);
         this._editFunction(result);
       }
    }); 
  }


  _editFunction(categoryData){
    this.recipeService.editCategory(categoryData).subscribe(data=>{
      console.log(data);
      if (data.success==true) {
         this.ngOnInit();
        }
      },error=>{
        console.log(error);
    })
  }


  // ----------------------------------------- 4-1-2018 --------------------------------------------------------


  deleteSingleRecipe(id){
    console.log(id);
    this.categoryId=id;
      let dialogRef = this.dialog.open(ConfirmationBoxComponent, {
            width: '300px',
            data:{ message:"forDeleteCategory"}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="yes") {
               // this._categoryDeletionFunction();
               this.passwordDialog();
            }
          }
        });
  }

   passwordDialog(){
     let dialogRef = this.dialog.open(PasswordDialogComponent, {
            width: '300px',
            data:{ from:"deletecategory"}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="yes") {
              this._categoryDeletionFunction();
            }
          }
        });
  }

  _categoryDeletionFunction(){
      this.recipeService.deleteCategoryById(this.categoryId).subscribe(data=>{
        if (data.success==false && data.message=="sorry you cannot delete this category") {
         this.toastr.error('Sorry this category cannot be deleted', 'Oops!');
         return 0;
        }
        if (data.success==true) {
         this.ngOnInit();
        }
      },err=>{
        console.log(err);
      })
  }

}
