import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// Libs
import { FIREBASE_PROVIDERS, AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAGz8N7LXf7-gDatSoI_a6NENGSml1P7-c",
  authDomain: "bounce-2a976.firebaseapp.com",
  databaseURL: "https://bounce-2a976.firebaseio.com",
  storageBucket: "bounce-2a976.appspot.com",
  messagingSenderId: "853796948041"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [ FIREBASE_PROVIDERS ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
