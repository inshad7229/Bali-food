import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategoryComponent } from '../../popups/add-category/add-category.component'
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onAddCategory(): void {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
        width: '300px',
      });
    	dialogRef.afterClosed().subscribe(result => {
    	 if (result) {
         console.log(result);
       }
    }); 
  }

}
