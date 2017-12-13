import { Component, OnInit } from '@angular/core';
import { IngredientsComponent } from '../../popups/ingredients/ingredients.component';
import { InstructionsComponent } from '../../popups/instructions/instructions.component';
import { SelectUserComponent } from '../../popups/select-user/select-user.component'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ingredients;
  instructions;
  ngOnInit() {
  }

  addIngredient(): void {
    let dialogRef = this.dialog.open(IngredientsComponent, {
        width: '350px',
      });
    	dialogRef.afterClosed().subscribe(result => {
    	 if (result) {
         console.log(result);
         this.ingredients=result.toString();
       }
    }); 
  }

  addInstructions():void {
    let dialogRef = this.dialog.open(InstructionsComponent, {
        width: '350px',
      });
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log(result);
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
         
       }
    }); 
  }
  
 
}
