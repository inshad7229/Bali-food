import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {
  instructions=[];
  instruction;
  constructor(public dialogRef: MatDialogRef<InstructionsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onAdd(){
    if (this.instruction) {
      // code...
      this.instructions.push(this.instruction);
      this.instruction='';
    }else{
      return 0;
    }
  }

  onSubmit(){
  	this.dialogRef.close(this.instructions);
  }
}
