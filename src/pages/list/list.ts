import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth: AuthService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  signOutWithEmail() {
    this._auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
