import { Component, OnInit } from '@angular/core';
import { GeneralmanagementService } from '../providers/generalmanagement.service'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers:[GeneralmanagementService]
})
export class ContactUsComponent implements OnInit {
	contactUsData;
	loading=false;
  constructor(private generalmanagementService: GeneralmanagementService) { }

  ngOnInit() {
  	this.getContactUsData();
  }

  getContactUsData(){
  	this.loading=true
  	this.generalmanagementService.getContactUsData().subscribe(data=>{
  		console.log(data);
  		this.contactUsData=data.data;
  		this.loading=false
  	},err=>{
  		console.log(err);
  	})
  }

  mailto(email){
  	return "mailto:"+email;
  }

}
