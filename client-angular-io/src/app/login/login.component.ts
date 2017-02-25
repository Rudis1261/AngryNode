import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginProviders: Array<string>;
  
  constructor() {
    this.loginProviders = [
      'email',
      'facebook',
      'google',
      'github'
    ];
  }

  ngOnInit() {
  }
}
