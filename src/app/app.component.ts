import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController, MenuController } from 'ionic-angular'; //Maybe MenuController and Nav
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

  @ViewChild(Nav) nav: Nav; //Only needed to push or pop onto the stack root page. All other pages can have an NavController injected.
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;
  loader: any;

  constructor(public platform: Platform, public af: AngularFire, private _auth: AuthService, public loadingCtrl: LoadingController, public menu: MenuController,) {

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Visual', component: VisualPage }
    ];
    console.log(this.pages);

    this.af.auth.subscribe((auth) => {

      if (auth !== null) {
        this.rootPage = HomePage;
        console.log("Logged In");
      } else {
        this.rootPage = LoginPage;
        console.log("Not Logged In");
      };

      //this.loader.dismiss();
    });

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
    this.nav.push(page.component);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    this.loader.present();
  }





}
