import { Component, OnInit } from '@angular/core';
import { GeneralManagentService } from './general-management.service';
import { AboutUsContentModel } from './general-management.model'

@Component({
  selector: 'app-general-management',
  templateUrl: './general-management.component.html',
  styleUrls: ['./general-management.component.scss'],
  providers:[GeneralManagentService,AboutUsContentModel]
})
export class GeneralManagementComponent implements OnInit {
 aboutUsdata;
 progressBar=false;
 editContent=false;
 aboutUsContentModel:AboutUsContentModel= new AboutUsContentModel()
  constructor( private generalManagentService:GeneralManagentService) { }

  ngOnInit() {
  	this.getAboutUsData();
  }


  getAboutUsData(){
  	this.progressBar=true
  	this.generalManagentService.getAboutUsData().subscribe(data=>{
  	this.aboutUsdata=data.content[0].content;
    this.aboutUsContentModel.content=data.content[0].content
		this.aboutUsdata = this.aboutUsdata.replace(/(?:\r\n|\r|\n)/g, '<br />');


  		this.progressBar=false;
  	}),err=>{
  		// alert(err)
  	}
  }

  onEditContent(){
  	this.editContent=true;
  }
  onCancel(){
  	this.editContent=false;
  }

  updateData(){
  	this.generalManagentService.updateAboutUsData(this.aboutUsContentModel).subscribe(data=>{
  		this.getAboutUsData()
  		this.editContent=false
  	})
  }
}
