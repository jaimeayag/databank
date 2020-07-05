import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// query here
declare var $: any;

export class Message {
  constructor(public content: string, public sentBy: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // variables here
  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  

  // server posted variables here
  log_chat_session_url = 'chatbot/log_chat_session.php';

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) { }

  updateScroll() {
    var element = document.getElementById("chat-jad");
    element.scrollTo(0,element.scrollHeight);
    // element.scrollTop = element.scrollHeight + 500;
    //element.scrollBy(0,5000);
  }

  // add message to source 
  update(msg: Message) {

    // log here
    // this.logMessage(msg);

    //
    this.conversation.next([msg]);
  }

  // send and recieve message from dialogflow v1
  logMessage(msg) {

    // variables here
    let send_data = {};
    let message_content = msg.content;
    let message_sent_by = msg.sentBy;
    let session_token = localStorage.session_token;

    // store here
    send_data["message_content"] = message_content;
    send_data["message_sent_by"] = message_sent_by;
    send_data["session_token"] = session_token;

    // api request here
    this.http.post(this.log_chat_session_url, send_data).subscribe((res: any) => {

      // variables here
      // console.log(res);
    });
  }

  // send and recieve message from dialogflow v1
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    // send to api here
    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
        
    // setTimeout(function() {
    //   var element = document.getElementById("chat-jad");
    // element.scrollTo(0,element.scrollHeight);
    // }, 100);
      })
  }
}