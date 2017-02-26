import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  auth: any;
  
  constructor(public af: AngularFire, private router: Router) {
    this.loaded = false;
    this.lockName = false;
    this.messages = af.database.list('/messages/');
    this.newMessage = {
      "name": "",
      "text": "",
      "date": ""
    };
    
    this.messages.subscribe((data) => this.receive(data));
    this.auth = false;
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
    //console.log('Save');
    this.newMessage["text"] = "";
    this.scrollChats();
  }
  
  clear(event) {
    //console.log('Clear');
    event.preventDefault();
    this.messages.remove().then(() => console.log('deleted!'));
  }
  
  logout(event) {
    event.preventDefault();
    this.af.auth.logout();
  }
  
  onLoad(messages) {
    //console.log('Retrieved Messages', messages);
    this.loaded = true;
    let that = this;
    window.setTimeout(function(){
      that.scrollChats();
    }, 1000);
  }
  
  onSubmit(form) { 
    if (this.auth.displayName !== "" && this.newMessage["text"] !== "") {
      this.newMessage["date"] = new Date().getTime();
      this.newMessage["name"] = this.auth.displayName || this.auth.email;
      //console.log("NEW MESSAGE:", this.newMessage);
      this.messages.push(this.newMessage).then(() => this.saved(), console.error);
    }
  }

  ngOnInit() {
    this.messages.subscribe((messages) => this.onLoad(messages));
    
    this.af.auth.subscribe(auth => {
      //console.log(auth);
      if(auth && auth.auth) {
        this.auth = auth.auth;
      } else {
        this.router.navigate(['/login'])
      }
    });
  }
}
