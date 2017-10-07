import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DashboardService } from './dashboard.service'
import { DomSanitizer } from '@angular/platform-browser';

const URL = 'http://localhost:8080/api/uploads';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DashboardService]
})

export class DashboardComponent implements OnInit {
  path:any;
  imagePath
   public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photos'});
   constructor(private dashboardService:DashboardService,private domSanitizer:DomSanitizer) { }

   ngOnInit() {
       // //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
       // this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
       // //overide the onCompleteItem property of the uploader so we are 
       // //able to deal with the server response.
       // this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
       //      console.log("ImageUpload:uploaded:", item, status, response);
       //  };
    }

  //   getImage(){
  //   this.dashboardService.getImage('')
  //   .subscribe(data =>{
  //      this.path=data;
  //      alert(this.path);
  //   })
  // }

   

}
