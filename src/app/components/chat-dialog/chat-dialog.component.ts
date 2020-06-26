import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  // variables here
  messages: Observable<Message[]>;
  formValue: string;

  // variables here
  welcome_message = "Welcome! How can I help you?";

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    //
    this.messages = this.chat.conversation.asObservable().pipe(scan((acc, val) => acc.concat(val)));

    // welcome message here
    this.welcomeMessage();
    
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

        //
        console.log("empty here");
        return;
    }

    // call function here
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}
