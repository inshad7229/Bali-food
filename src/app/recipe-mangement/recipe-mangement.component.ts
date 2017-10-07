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
export class RecipeMangementComponent implements OnInit,AfterViewChecked  {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
	// abc={
	// 	color: 'red',
	// 	background:"blue",
	// 	padding:"10px 0px 1px 2px",
	// 	textAlign:"center"
	// }
	// private color: string = "#127bdc";
	title = 'app';

  chats: any;
  joinned: boolean = false;
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };
  socket = io('http://localhost:8080');
  constructor(private cpService: ColorPickerService,private chatService: ChatService) { }

 ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if(user!==null) {
      this.getChatByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {

        this.chats.push(data.message);
        this.msgData = { room: user.room, nickname: user.nickname, message: '' }
        this.scrollToBottom();
      }
    }.bind(this));
  }

   scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getChatByRoom(room) {
    this.chatService.getChatByRoom(room).then((res) => {
      this.chats = res;
    }, (err) => {
      console.log(err);
    });
  }

  joinRoom() {
    var date = new Date();
    localStorage["user"]=JSON.stringify(this.newUser);
    this.getChatByRoom(this.newUser.room);
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }


  logout() {
    var date = new Date();
    var user = JSON.parse(localStorage["user"]);
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
    localStorage.removeItem("user");
    this.joinned = false;
  }
  //  sendMessage() {
  //   this.chat.sendMsg("Test Message");
  // }
}
