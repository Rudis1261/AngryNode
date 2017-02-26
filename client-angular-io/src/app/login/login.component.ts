import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginProviders: Array<string>;
  error: any;
  authProvider: any;
  emailLogin: boolean;
  loginDetails: Object;
  providerImages: Object;
  
  constructor(public af: AngularFire,private router: Router) {
    this.loginProviders = [
      'email',
      'facebook',
      'google',
      'github'
    ];
    // this.providerImages = {
    //   'email': "",
    //   'facebook': "",
    //   'google': "",
    //   'github': ""
    // };
    this.loginDetails = {
      'email': "",
      'password': ""
    };
    this.emailLogin = false;
    this.error = false;
  }
  
  login(provider) {
    //console.log("LOGIN With", provider);
    this.error = false;
    this.authProvider = AuthProviders.Facebook;
    switch(provider) {
      case 'github':
        this.authProvider = AuthProviders.Github;
        break; 
      case 'google':
        this.authProvider = AuthProviders.Google;
        break;
      case 'facebook':
        this.authProvider = AuthProviders.Facebook;
        break;
    }
    
    if (provider !== 'email') {
      this.af.auth.login({
        provider: this.authProvider,
        method: AuthMethods.Popup,
      }).then(
          (success) => { 
            this.loginResp('success', success)
      }).catch(
          (err) => {
            this.loginResp('err', err)
      })
    } else {
      this.emailLogin = true;
    }
  }
  
  loginResp(state, resp) {
    //console.log("LOGIN State:", state, "RESP:", resp);
    if (state == 'err') {
      this.error = resp;
      console.error(resp);
    }
    if (state == 'success') {
      this.router.navigate(['/']);
    }
  }

  allLoginOptions(event) {
    event.preventDefault();
    this.emailLogin = false;
  }
  
  onSubmit(form, type) {
    this.error = false;
    if (this.loginDetails['email'] == "" || this.loginDetails['password'] == "") {
      return false;
    }
    
    if (type == 'register') {
      
      this.af.auth.createUser({
        email: this.loginDetails['email'],
        password: this.loginDetails['password']
      }).then(
        (success) => {
        this.loginResp('success', success)
      }).catch(
        (err) => {
        this.loginResp('err', err)
      });
      
    } else {
      
      this.af.auth.login({
        email: this.loginDetails['email'],
        password: this.loginDetails['password']
      }).then(
        (success) => {
        this.loginResp('success', success)
      }).catch(
        (err) => {
        this.loginResp('err', err)
      });
      
    }
  }

  ngOnInit() {
    this.providerImages = {
      'email': require('assets/img/social/mail.png'),
      'facebook': require('assets/img/social/fb.png'),
      'google': require('assets/img/social/google.png'),
      'github': require('assets/img/social/github.png')
    };
  }
}
