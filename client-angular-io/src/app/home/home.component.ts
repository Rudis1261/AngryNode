import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFire, FirebaseRef, FirebaseListObservable } from 'angularfire2';

declare var Document: any;
declare var Window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  messages: FirebaseListObservable<any[]>;
  newMessage: Object;
  loaded: boolean;
  lockName: boolean;
  
  constructor(public af: AngularFire) {
    this.loaded = false;
    this.lockName = false;
    this.messages = af.database.list('/messages/');
    this.newMessage = {
      "name": "",
      "text": "",
      "date": ""
    };
    
    this.messages.subscribe((data) => this.receive(data));
  }
  
  receive(data) {
    this.scrollChats();
  }
    
  scrollChats() {
    if (!document.querySelectorAll("#chat") || !document.querySelectorAll("#chat").length) {
      return false;
    }
    document.querySelectorAll("#chat")[0].scrollTop = document.querySelectorAll("#chat")[0].scrollHeight;
  }
  
  saved() {
    this.lockName = true;
    console.log('Save');
    this.newMessage["text"] = "";
    this.scrollChats();
  }
  
  clear() {
    console.log('Clear');
    this.messages.remove().then(() => console.log('deleted!'));
  }
  
  load(messages) {
    console.log('Retrieved Messages', messages);
    this.loaded = true;
    let that = this;
    window.setTimeout(function(){
      that.scrollChats();
    }, 1000);
  }
  
  onSubmit(form) { 
    if (this.newMessage["name"] !== "" && this.newMessage["text"] !== "") {
      console.log(this.newMessage);
      this.newMessage["date"] = new Date().getTime();
      this.messages.push(this.newMessage).then(() => this.saved(), console.error);
    }
  }

  ngOnInit() {
    this.messages.subscribe((messages) => this.load(messages));
  }
}
