import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Sort } from '@angular/material';
import { UserManagementService } from '../user-mangement/user-management.service';

declare let jsPDF; 
// import * as autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.scss'],
  providers:[UserManagementService]
})
export class ReportManagementComponent implements OnInit {
 data
 progressBar
 userData
 sortedData;
 mainData;

  constructor(private userManagementService:UserManagementService) { 
  	
  }

 


  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
   this.progressBar=true;
   this.userManagementService.getUserData()
    .subscribe(data =>{
      this.userData=data.users;
      this.progressBar=false;
      this.sortedData = this.userData.slice();
   }),error=>{
      this.progressBar=false;
    }
  }

  sortData(sort: Sort) {
    const data =this.userData.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.username, b.username, isAsc);
        case 'date': return compare(+a.date, +b.date, isAsc);
        default: return 0;
      }
    });
  }

  generateReport(){
    let heading=[{
      "_id":"ID",
      "email":"Email ID",
      "username":"User Name",
      "registerationDate":"Registration date",
      "status":"Status"
     },
     {
      "_id":" ",
      "email":" ",
      "username":" ",
      "registerationDate":" ",
      "status":" "
     }]
      let local=[]
      let dummy=this.sortedData
      for (let i=0;i<dummy.length;i++) {
      let obj=dummy[i]
         delete(obj['password'])
         delete(obj['__v'])
         obj['registerationDate']=obj['registerationDate'].split('T')[0]
         local.push(obj)
      }
      let final=heading.concat(local);
      this.mainData=final;
      // alert(JSON.stringify(this.mainData))
     // let local=this.sortedData.filter(arg=> !arg.password);
      let date=new Date().toISOString()
     let splitDate=date.split('T');
     let pdfName='UserReport_'+splitDate[0]
      console.log(JSON.stringify(local));
    new Angular2Csv(final, pdfName);
  }

onGeneratePdf(){
   var columns = [
    {title: "ID", dataKey: "_id"},
    {title: "Name", dataKey: "username"}, 
    {title: "email", dataKey: "email"},
    {title: "RegisterationDate", dataKey:"registerationDate"},
    {title:"Status", dataKey:"status"}
    // {title: "v", datakey:"__v"} ,
    // {title: "status", datakey:"status"} ,
  ];
var rows = this.sortedData;
 let date=new Date().toISOString()
 let splitDate=date.split('T');
 let pdfName='UserReport_'+splitDate[0]+'.pdf'
// Only pt supported (not mm or in) 
var doc = new jsPDF('p', 'pt');
doc.autoTable(columns, rows);
doc.save(pdfName);
    }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

