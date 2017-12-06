import { Component, OnInit } from '@angular/core';
import { Router,RouterLinkActive } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserlistComponent } from '../../popups/userlist/userlist.component';


@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss']
})
export class ViewRecipesComponent implements OnInit {

  constructor(private router:Router,public dialog: MatDialog) { }

  ngOnInit() {
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

}
