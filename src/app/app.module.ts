import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2'; //Additional may include FIREBASE_PROVIDERS, AngularFire

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotUsernamePage } from '../pages/forgot-username/forgot-username';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ListPage } from '../pages/list/list';
import { VisualPage } from '../pages/visual/visual';


import { AuthService } from '../providers/auth-service';
import { ConnectivityService } from '../providers/connectivity-service';

export const firebaseConfig = {
	apiKey: "AIzaSyDtrViczYDN4XJ8IueimrnaVT6PC0C1BaY",
	authDomain: "lc-geo-location.firebaseapp.com",
	databaseURL: "https://lc-geo-location.firebaseio.com",
	storageBucket: "lc-geo-location.appspot.com",
	messagingSenderId: "904516934736"
};

const myFirebaseAuthConfig = {
	provider: AuthProviders.Password,
	method: AuthMethods.Password,
	remember: 'default',
};


@NgModule({
  declarations: [
    MyApp,
		HomePage,
    LoginPage,
		RegisterPage,
    ForgotUsernamePage,
    ForgotPasswordPage,
		ListPage,
    VisualPage

  ],
  imports: [
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
		HomePage,
    LoginPage,
		RegisterPage,
    ForgotUsernamePage,
    ForgotPasswordPage,
		ListPage,
    VisualPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, ConnectivityService]
})
export class AppModule {}
