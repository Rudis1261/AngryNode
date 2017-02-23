import { Component, OnInit } from '@angular/core';
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
  
  constructor(public af: AngularFire) {
    this.messages = af.database.list('/messages/');
    this.newMessage = {
      "name": "",
      "text": "",
      "date": ""
    };
  }
  
  saved() {
    console.log('item added') ;
    this.newMessage["text"] = "";
  }
  
  onSubmit(form) { 
    if (this.newMessage["name"] !== "" && this.newMessage["text"] !== "") {
      this.newMessage["date"] = new Date().getTime();
      console.log(this.newMessage);
      this.messages.push(this.newMessage).then(
        () => this.saved(),
        console.error
      );
    }
  }
  
  keyDownFunction(event, form) {
    if(event.keyCode == 13) {
      this.onSubmit(form);
    }
  }

  ngOnInit() {}
}
