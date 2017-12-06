import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingredients=[];
  ingredient;
 
  constructor(public dialogRef: MatDialogRef<IngredientsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onAdd(){
    this.ingredients.push(this.ingredient);
    this.ingredient='';
  }

  onSubmit(){
  	this.dialogRef.close(this.ingredients);
  }
}
