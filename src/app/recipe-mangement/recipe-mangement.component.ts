import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ColorPickerService } from 'angular4-color-picker';
import { ChatService } from './chat.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-recipe-mangement',
  templateUrl: './recipe-mangement.component.html',
  styleUrls: ['./recipe-mangement.component.scss'],
  providers:[ChatService]
})
export class RecipeMangementComponent implements OnInit  {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
	// abc={
	// 	color: 'red',
	// 	background:"blue",
	// 	padding:"10px 0px 1px 2px",
	// 	textAlign:"center"
	// }
	// private color: string = "#127bdc";
	title = 'app';

 
  constructor(private cpService: ColorPickerService,private chatService: ChatService) { }

 ngOnInit() {
    
  }

 
}
