import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

// query here
declare var $: any;

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  // variables here
  messages: Observable<Message[]>;
  formValue: string;
  session_token;
  
  // welcome message here
  welcome_message = "Welcome! How can I help you?";

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    //
    this.messages = this.chat.conversation.asObservable().pipe(scan((acc, val) => acc.concat(val)));

    // welcome message here
    this.welcomeMessage();

    // generate token here
    this.generateSessionToken();
  }

  // toggle chat box here
  toggleChatbox() {

    // toggle here
    $(".chat-body").toggleClass("chat-display");
    $(".chat-footer").toggleClass("chat-display");
    $(".chat-body").toggleClass("chat-hidden");
    $(".chat-footer").toggleClass("chat-hidden");
  }

  // generate session token here
  generateSessionToken() {

    // variables here
    let date_now = new Date();
    const unixtime = date_now.valueOf();
    const rand_num = Math.floor(Math.random() * 99) + 1;
    // token here
    const session_token = unixtime + rand_num;

    //
    localStorage.setItem('session_token', session_token.toString());
  }

  // send message here
  welcomeMessage() {
    // call function here
    const botMessage = new Message(this.welcome_message,'bot');
    this.chat.update(botMessage);
  }

  // send message here
  sendMessage() {

    // check value here
    if (!this.formValue) {
        // empty here
        return;
    }

    // call function here
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}