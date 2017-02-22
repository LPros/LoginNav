import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular'; //Maybe MenuController and Nav
import { StatusBar, Splashscreen } from 'ionic-native';

import { AuthService } from '../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { ForgotUsernamePage } from '../pages/forgot-username/forgot-username';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ListPage } from '../pages/list/list';
import { VisualPage } from '../pages/visual/visual';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  //@ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  //pages: Array<{ title: string, component: any }>;
  loader: any;

  constructor(public platform: Platform, public af: AngularFire, private _auth: AuthService, public loadingCtrl: LoadingController) { //public menu: MenuController,

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    this.loader.present();
  }





}
