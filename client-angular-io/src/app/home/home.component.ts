import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFire, FirebaseRef, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  messages: FirebaseListObservable<any[]>;
  newMessage: Object;
  loaded: boolean;
  
  constructor(@Inject('Document') document: Document, public af: AngularFire) {
    this.loaded = false;
    this.messages = af.database.list('/messages/');
    this.newMessage = {
      "name": "",
      "text": "",
      "date": ""
    };
  }
  
  saved() {
    console.log('Save');
    this.newMessage["text"] = "";
    document.querySelectorAll("#chat")[0].scrollTop = document.querySelectorAll("#chat")[0].scrollHeight;
  }
  
  clear() {
    console.log('Clear');
    this.messages.remove().then(() => console.log('deleted!'));
  }
  
  load(messages) {
    console.log('Retrieved Messages', messages);
    this.loaded = true;
  }
  
  onSubmit(form) { 
    if (this.newMessage["name"] !== "" && this.newMessage["text"] !== "") {
      console.log(this.newMessage);
      this.newMessage["date"] = new Date().getTime();
      this.messages.push(this.newMessage).then(() => this.saved(), console.error);
    }
  }
  
  keyDownFunction(event, form) {
    if(event.keyCode == 13) {
      this.onSubmit(form);
    }
  }

  ngOnInit() {
    this.messages.subscribe((messages) => this.load(messages));
  }
}
